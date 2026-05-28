import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const AREA_LABELS: Record<string, string> = {
  money:    '재물운',
  love:     '사랑운',
  career:   '직업운',
  health:   '건강운',
  overview: '종합운세',
}

const PERIOD_LABELS: Record<string, string> = {
  daily:   '오늘',
  monthly: '이번 달',
  yearly:  '올해',
  early:   '초년기',
  middle:  '중년기',
  late:    '말년기',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // OpenAI API 키 확인
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
  if (!openaiApiKey) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'OPENAI_API_KEY가 설정되지 않았습니다. Supabase 대시보드 > Edge Functions > Secrets에서 OPENAI_API_KEY를 추가하세요.',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  // JWT 인증
  const authHeader = req.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ ok: false, error: '인증 토큰이 없습니다.' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const token = authHeader.replace('Bearer ', '')
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
  const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

  const anonClient = createClient(
    supabaseUrl,
    Deno.env.get('SUPABASE_ANON_KEY') ?? supabaseServiceRoleKey,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  )

  const { data: { user }, error: authError } = await anonClient.auth.getUser(token)
  if (authError || !user) {
    return new Response(
      JSON.stringify({ ok: false, error: '인증에 실패했습니다.' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  // 요청 파라미터 파싱
  let area: string
  let period: string
  let stars: number
  let count: number

  try {
    const body = await req.json()
    area   = body.area
    period = body.period
    stars  = Number(body.stars)
    count  = Number(body.count)
    if (!area || !period || !stars || !count) throw new Error('필수 파라미터가 누락되었습니다.')
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: (err as Error).message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const areaLabel   = AREA_LABELS[area]   ?? area
  const periodLabel = PERIOD_LABELS[period] ?? period

  const prompt =
    `다음 조건에 맞는 한국어 운세 텍스트를 정확히 ${count}개 작성해주세요.\n\n` +
    `조건:\n` +
    `- 분야: ${areaLabel}\n` +
    `- 시기: ${periodLabel}\n` +
    `- 운세 등급: ${stars}점(별${stars}개, 1~5점 척도)\n` +
    `- 각 텍스트는 반드시 5문장 이상\n` +
    `- 긍정적인 흐름과 함께 조심해야 할 점(주의사항)을 반드시 포함할 것\n` +
    `- 자연스럽고 따뜻한 문체, 지나치게 불길하지 않게\n` +
    `- 각 텍스트는 "---"로 구분\n\n` +
    `텍스트만 작성하고 번호나 설명은 붙이지 마세요.`

  // OpenAI API 호출
  let responseText: string
  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        model:      'gpt-4o-mini',
        max_tokens: 2048,
        messages: [
          { role: 'user', content: prompt },
        ],
      }),
    })

    if (!openaiRes.ok) {
      const errBody = await openaiRes.text()
      throw new Error(`OpenAI API 오류 (${openaiRes.status}): ${errBody}`)
    }

    const openaiData = await openaiRes.json()
    responseText = openaiData.choices?.[0]?.message?.content ?? ''

    if (!responseText) throw new Error('OpenAI API 응답에서 텍스트를 추출할 수 없습니다.')
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: (err as Error).message }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  // --- 구분자로 텍스트 분리
  const texts = responseText
    .split('---')
    .map((t: string) => t.trim())
    .filter((t: string) => t.length > 0)

  if (texts.length === 0) {
    return new Response(
      JSON.stringify({ ok: false, error: '생성된 텍스트가 없습니다.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  // DB 저장
  const serviceClient = createClient(supabaseUrl, supabaseServiceRoleKey)

  const rows = texts.map((text: string, i: number) => ({
    area,
    period,
    stars,
    text_ko:    text,
    sort_order: Date.now() + i,
  }))

  const { data: inserted, error: insertError } = await serviceClient
    .from('mystic_fortune_texts')
    .insert(rows)
    .select()

  if (insertError) {
    return new Response(
      JSON.stringify({ ok: false, error: `DB 저장 오류: ${insertError.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ ok: true, inserted: inserted?.length ?? texts.length, texts }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
})
