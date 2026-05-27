import { useState, useEffect } from 'react';
import type { ReactElement, CSSProperties } from 'react';
import {
  fetchPosts, createPost, incrementView,
  fetchComments, createComment,
} from '../../utils/boardStorage';
import type { Post, BoardComment } from '../../utils/boardStorage';

export interface BoardConfig {
  board: string;
  showEmail: boolean;
  placeholder: string;
}

type View = 'list' | 'write' | 'detail';

const fmt = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

const field: CSSProperties = {
  padding: '9px 12px',
  border: '1px solid var(--line)',
  borderRadius: '8px',
  fontSize: '13px',
  outline: 'none',
  background: 'var(--bg-white)',
  color: 'var(--navy-800)',
  width: '100%',
  boxSizing: 'border-box',
};

const BoardPage = ({ config }: { config: BoardConfig }): ReactElement => {
  const [view, setView] = useState<View>('list');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<BoardComment[]>([]);

  const [wTitle, setWTitle] = useState('');
  const [wContent, setWContent] = useState('');
  const [wAuthor, setWAuthor] = useState('');
  const [wEmail, setWEmail] = useState('');
  const [wSaving, setWSaving] = useState(false);

  const [cAuthor, setCAuthor] = useState('');
  const [cContent, setCContent] = useState('');
  const [cSaving, setCSaving] = useState(false);

  const loadPosts = () => {
    setLoading(true);
    fetchPosts(config.board).then(d => { setPosts(d); setLoading(false); });
  };

  useEffect(() => { loadPosts(); }, [config.board]);

  const openDetail = async (p: Post) => {
    setPost(p);
    setView('detail');
    setComments([]);
    await incrementView(p);
    const cs = await fetchComments(p.id);
    setComments(cs);
  };

  const goList = () => { loadPosts(); setView('list'); };

  const submitPost = async () => {
    if (!wTitle.trim() || !wContent.trim() || !wAuthor.trim()) return;
    setWSaving(true);
    try {
      await createPost({
        board: config.board,
        title: wTitle.trim(),
        content: wContent.trim(),
        author: wAuthor.trim(),
        email: wEmail.trim(),
      });
      setWTitle(''); setWContent(''); setWAuthor(''); setWEmail('');
      goList();
    } finally {
      setWSaving(false);
    }
  };

  const submitComment = async () => {
    if (!cAuthor.trim() || !cContent.trim() || !post) return;
    setCSaving(true);
    try {
      const nc = await createComment(
        { post_id: post.id, author: cAuthor.trim(), content: cContent.trim() },
        config.board,
        post.comment_count
      );
      setComments(cs => [...cs, nc]);
      setPost(p => p ? { ...p, comment_count: p.comment_count + 1 } : p);
      setCAuthor(''); setCContent('');
    } finally {
      setCSaving(false);
    }
  };

  /* ── List ── */
  if (view === 'list') return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button className="btn btn-primary" onClick={() => setView('write')}>글쓰기</button>
      </div>
      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px 0', margin: 0 }}>로딩 중...</p>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 24px', background: 'var(--navy-50)', borderRadius: '10px' }}>
          <div style={{ fontSize: '34px', marginBottom: '10px' }}>📭</div>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
            아직 게시글이 없습니다. 첫 글을 남겨보세요!
          </p>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--navy-50)', borderBottom: '2px solid var(--navy-800)' }}>
              <th style={{ padding: '9px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--navy-800)' }}>제목</th>
              <th style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--navy-800)', width: '80px' }}>작성자</th>
              <th style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--navy-800)', width: '94px' }}>날짜</th>
              <th style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--navy-800)', width: '50px' }}>조회</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p, i) => (
              <tr key={p.id}
                onClick={() => openDetail(p)}
                style={{ cursor: 'pointer', borderBottom: '1px solid var(--line)', background: i % 2 === 0 ? 'var(--bg-white)' : 'var(--navy-50)' }}>
                <td style={{ padding: '9px 12px', color: 'var(--navy-800)', fontWeight: 500 }}>
                  {p.title}
                  {p.comment_count > 0 && (
                    <span style={{ marginLeft: '5px', fontSize: '11px', color: 'var(--gold)' }}>
                      [{p.comment_count}]
                    </span>
                  )}
                </td>
                <td style={{ padding: '9px 12px', textAlign: 'center', color: 'var(--text-secondary)' }}>{p.author}</td>
                <td style={{ padding: '9px 12px', textAlign: 'center', color: 'var(--text-secondary)' }}>{fmt(p.created_at)}</td>
                <td style={{ padding: '9px 12px', textAlign: 'center', color: 'var(--text-secondary)' }}>{p.view_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  /* ── Write ── */
  if (view === 'write') return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <button className="btn btn-ghost" onClick={goList}>← 목록</button>
        <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navy-800)' }}>새 글 작성</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input style={field} value={wTitle} onChange={e => setWTitle(e.target.value)} placeholder="제목" />
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            style={{ ...field, flex: '0 0 160px', width: 'auto' }}
            value={wAuthor} onChange={e => setWAuthor(e.target.value)}
            placeholder="작성자" />
          {config.showEmail && (
            <input
              style={{ ...field }}
              value={wEmail} onChange={e => setWEmail(e.target.value)}
              placeholder="이메일 (답변 수신용, 선택)" />
          )}
        </div>
        <textarea
          style={{ ...field, resize: 'vertical', lineHeight: 1.7 }}
          rows={12}
          value={wContent} onChange={e => setWContent(e.target.value)}
          placeholder={config.placeholder} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button className="btn btn-ghost" onClick={goList}>취소</button>
          <button
            className="btn btn-primary"
            onClick={submitPost}
            disabled={!wTitle.trim() || !wContent.trim() || !wAuthor.trim() || wSaving}>
            {wSaving ? '등록 중...' : '등록'}
          </button>
        </div>
      </div>
    </div>
  );

  /* ── Detail ── */
  if (!post) return <></>;
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <button className="btn btn-ghost" style={{ marginBottom: '10px' }} onClick={goList}>← 목록</button>

      <div style={{ background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '10px', padding: '18px 22px', marginBottom: '10px' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: '17px', fontWeight: 800, color: 'var(--navy-800)', lineHeight: 1.4 }}>
          {post.title}
        </h3>
        <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: 'var(--text-secondary)', paddingBottom: '12px', borderBottom: '1px solid var(--line)', marginBottom: '14px' }}>
          <strong style={{ color: 'var(--navy-800)' }}>{post.author}</strong>
          <span>{fmt(post.created_at)}</span>
          <span>조회 {post.view_count}</span>
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--navy-800)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
          {post.content}
        </p>
      </div>

      <div style={{ background: 'var(--navy-50)', border: '1px solid var(--line)', borderRadius: '10px', padding: '14px 18px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '8px' }}>
          댓글 {comments.length}
        </div>
        {comments.map(c => (
          <div key={c.id} style={{ borderBottom: '1px solid var(--line)', padding: '8px 0' }}>
            <div style={{ display: 'flex', gap: '10px', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '3px' }}>
              <strong style={{ color: 'var(--navy-800)' }}>{c.author}</strong>
              <span>{fmt(c.created_at)}</span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--navy-800)', lineHeight: 1.6 }}>{c.content}</p>
          </div>
        ))}
        <div style={{ marginTop: '12px' }}>
          <input
            style={{ ...field, width: '160px', marginBottom: '6px' }}
            value={cAuthor} onChange={e => setCAuthor(e.target.value)}
            placeholder="작성자" />
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            <textarea
              style={{ ...field, resize: 'none', lineHeight: 1.6 }}
              rows={2}
              value={cContent} onChange={e => setCContent(e.target.value)}
              placeholder="댓글을 입력하세요..." />
            <button
              className="btn btn-primary"
              style={{ flexShrink: 0, alignSelf: 'flex-end' }}
              onClick={submitComment}
              disabled={!cAuthor.trim() || !cContent.trim() || cSaving}>
              {cSaving ? '...' : '등록'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
