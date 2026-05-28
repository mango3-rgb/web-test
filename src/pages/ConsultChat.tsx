import { useState, useRef, useEffect, type ReactElement, type FormEvent, type KeyboardEvent } from 'react';
import SEOHead from '../components/SEOHead';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `당신은 사주팔자, 별자리(서양점성술), MBTI 전문 상담가입니다.
"Suyoung's Secret"의 AI 상담사로서 사용자의 고민에 따뜻하고 전문적으로 답변해주세요.

- 사주팔자: 생년월일시를 기반으로 운명, 성격, 올해 운세 등을 상담
- 별자리: 태양궁, 상승궁, 달궁 등 서양점성술 기반 성격 및 운세 상담
- MBTI: 성격 유형 분석, 궁합, 인간관계 조언
- 타로: 카드 의미 해석 및 상황별 조언

항상 한국어로 답변하고, 공감적이고 긍정적인 톤을 유지하세요.
개인정보(이름, 연락처 등)는 요청하지 마세요.`;

const WELCOME = `안녕하세요! 🌟 Suyoung's Secret AI 상담사입니다.

사주팔자, 별자리, MBTI, 타로에 대해 무엇이든 물어보세요.

예시 질문:
• 1990년 5월 15일생 올해 운세가 어떤가요?
• 전갈자리와 물고기자리 궁합은?
• INFJ의 연애 스타일은 어떤가요?`;

const ConsultChat = (): ReactElement => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        'https://mlesrunnldasvqgqblss.supabase.co/functions/v1/openai-chat',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemPrompt: SYSTEM_PROMPT,
            messages: next.map(m => ({ role: m.role, content: m.content })),
          }),
        }
      );

      const data = await res.json() as { choices?: { message: { content: string } }[]; error?: string };
      if (!res.ok || data.error) throw new Error(data.error || `오류 ${res.status}`);

      const reply = data.choices?.[0]?.message?.content ?? '답변을 받지 못했습니다.';
      setMessages([...next, { role: 'assistant', content: reply }]);
    } catch (e) {
      setError((e as Error).message || '오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      <SEOHead title="AI 상담 | Suyoung's Secret" description="사주·별자리·MBTI AI 상담 챗봇" noindex />
      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">AI Consultation · 상담</div>
          <h2>AI 운세 상담</h2>
          <p>사주·별자리·MBTI 전문 AI 상담사와 대화해보세요</p>
        </div>
      </section>

      <section className="section-ed" style={{ padding: '32px 0 60px' }}>
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div className="consult-chat-wrap">
            {/* 채팅 메시지 영역 */}
            <div className="consult-chat-messages">
              {/* 웰컴 메시지 */}
              <div className="chat-msg assistant">
                <div className="chat-avatar">✨</div>
                <div className="chat-bubble">
                  {WELCOME.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </div>
              </div>

              {messages.map((msg, i) => (
                <div key={i} className={`chat-msg ${msg.role}`}>
                  {msg.role === 'assistant' && <div className="chat-avatar">✨</div>}
                  <div className="chat-bubble">
                    {msg.content.split('\n').map((line, j) => (
                      <span key={j}>{line}<br /></span>
                    ))}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="chat-msg assistant">
                  <div className="chat-avatar">✨</div>
                  <div className="chat-bubble chat-typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              {error && (
                <div className="chat-error">{error}</div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* 입력 영역 */}
            <form onSubmit={handleSubmit} className="consult-chat-form">
              <textarea
                ref={inputRef}
                className="consult-chat-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="질문을 입력하세요... (Enter로 전송, Shift+Enter 줄바꿈)"
                rows={2}
                disabled={loading}
              />
              <button
                type="submit"
                className="consult-chat-send"
                disabled={loading || !input.trim()}
                aria-label="전송"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>

            <p className="consult-chat-notice">
              AI 상담 결과는 참고용이며, 중요한 결정에는 전문가 상담을 권장합니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConsultChat;
