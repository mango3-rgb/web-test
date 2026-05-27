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
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Check Anthropic API key first
  const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
  if (!anthropicApiKey) {
    return new Response(
      JSON.stringify({
        ok: false,
        error:
          'ANTHROPIC_API_KEY가 설정되지 않았습니다. Supabase 대시보드 > Edge Functions > Secrets에서 ANTHROPIC_API_KEY를 추가하세요.',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  // Validate Authorization JWT
  const authHeader = req.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ ok: false, error: '인증 토큰이 없습니다.' }),
      {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  const token = authHeader.replace('Bearer ', '')
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
  const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

  // Verify JWT with anon client
  const anonClient = createClient(
    supabaseUrl,
    Deno.env.get('SUPABASE_ANON_KEY') ?? supabaseServiceRoleKey,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  )

  const { data: { user }, error: authError } = await anonClient.auth.getUser(token)
  if (authError || !user) {
    return new Response(
      JSON.stringify({ ok: false, error: '인증에 실패했습니다.' }),
      {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  // Parse request body
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

    if (!area || !period || !stars || !count) {
      throw new Error('필수 파라미터가 누락되었습니다.')
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: (err as Error).message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  const areaLabel   = AREA_LABELS[area]   ?? area
  const periodLabel = PERIOD_LABELS[period] ?? period

  // Build Korean prompt
  const prompt =
    `다음 조건에 맞는 한국어 운세 텍스트를 정확히 ${count}개 작성해주세요.\n\n` +
    `조건:\n` +
    `- 분야: ${areaLabel}\n` +
    `- 시기: ${periodLabel}\n` +
    `- 운세 등급: ${stars}점(별${stars}개, 1~5점 척도)\n` +
    `- 각 텍스트는 2~3문장\n` +
    `- 자연스럽고 희망적인 문체\n` +
    `- 각 텍스트는 "---"로 구분\n\n` +
    `텍스트만 작성하고 번호나 설명은 붙이지 마세요.`

  // Call Anthropic API
  let responseText: string
  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key':         anthropicApiKey,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
      },
      body: JSON.stringify({
        model:      'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [
          { role: 'user', content: prompt },
        ],
      }),
    })

    if (!anthropicRes.ok) {
      const errBody = await anthropicRes.text()
      throw new Error(`Anthropic API 오류 (${anthropicRes.status}): ${errBody}`)
    }

    const anthropicData = await anthropicRes.json()
    responseText = anthropicData.content?.[0]?.text ?? ''

    if (!responseText) {
      throw new Error('Anthropic API 응답에서 텍스트를 추출할 수 없습니다.')
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: (err as Error).message }),
      {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  // Split by --- separator and clean up
  const texts = responseText
    .split('---')
    .map((t: string) => t.trim())
    .filter((t: string) => t.length > 0)

  if (texts.length === 0) {
    return new Response(
      JSON.stringify({ ok: false, error: '생성된 텍스트가 없습니다.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  // Insert into mystic_fortune_texts using service role client
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
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  return new Response(
    JSON.stringify({
      ok:       true,
      inserted: inserted?.length ?? texts.length,
      texts,
    }),
    {
      status:  200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  )
})
