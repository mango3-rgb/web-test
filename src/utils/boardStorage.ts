import getSupabase from './supabase';
import site from '../config/site';

export interface Post {
  id: string;
  board: string;
  title: string;
  content: string;
  author: string;
  email: string;
  created_at: string;
  view_count: number;
  comment_count: number;
}

export interface BoardComment {
  id: string;
  post_id: string;
  author: string;
  content: string;
  created_at: string;
}

/* Supabase SQL (Supabase 사용 시 SQL 에디터에서 실행):
CREATE TABLE mystic_posts (
  id UUID PRIMARY KEY,
  board TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  email TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  view_count INT DEFAULT 0,
  comment_count INT DEFAULT 0
);
CREATE TABLE mystic_board_comments (
  id UUID PRIMARY KEY,
  post_id UUID REFERENCES mystic_posts(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE mystic_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE mystic_board_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read posts" ON mystic_posts FOR SELECT USING (true);
CREATE POLICY "public insert posts" ON mystic_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "public update posts" ON mystic_posts FOR UPDATE USING (true);
CREATE POLICY "public read comments" ON mystic_board_comments FOR SELECT USING (true);
CREATE POLICY "public insert comments" ON mystic_board_comments FOR INSERT WITH CHECK (true);
*/

const T_POSTS = `${site.dbPrefix}posts`;
const T_COMMENTS = `${site.dbPrefix}board_comments`;
const lsKey = (board: string) => `${site.dbPrefix}board_${board}`;
const lsCKey = (postId: string) => `${site.dbPrefix}bc_${postId}`;

const lsRead = <T>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const fetchPosts = async (board: string): Promise<Post[]> => {
  const sb = getSupabase();
  if (!sb) return [...lsRead<Post[]>(lsKey(board), [])].reverse();
  const { data, error } = await sb
    .from(T_POSTS)
    .select('*')
    .eq('board', board)
    .order('created_at', { ascending: false });
  if (error) return [...lsRead<Post[]>(lsKey(board), [])].reverse();
  return (data as Post[]) ?? [];
};

export const createPost = async (
  input: Omit<Post, 'id' | 'created_at' | 'view_count' | 'comment_count'>
): Promise<Post> => {
  const post: Post = {
    ...input,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    view_count: 0,
    comment_count: 0,
  };
  const sb = getSupabase();
  const saveLocal = () => {
    const list = lsRead<Post[]>(lsKey(input.board), []);
    list.push(post);
    localStorage.setItem(lsKey(input.board), JSON.stringify(list));
  };
  if (!sb) { saveLocal(); return post; }
  const { error } = await sb.from(T_POSTS).insert(post);
  if (error) saveLocal();
  return post;
};

export const incrementView = async (post: Post): Promise<void> => {
  const sb = getSupabase();
  if (!sb) {
    const list = lsRead<Post[]>(lsKey(post.board), []);
    const idx = list.findIndex(p => p.id === post.id);
    if (idx >= 0) {
      list[idx].view_count++;
      localStorage.setItem(lsKey(post.board), JSON.stringify(list));
    }
    return;
  }
  await sb.from(T_POSTS).update({ view_count: post.view_count + 1 }).eq('id', post.id);
};

export const fetchComments = async (postId: string): Promise<BoardComment[]> => {
  const sb = getSupabase();
  if (!sb) return lsRead<BoardComment[]>(lsCKey(postId), []);
  const { data, error } = await sb
    .from(T_COMMENTS)
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  if (error) return lsRead<BoardComment[]>(lsCKey(postId), []);
  return (data as BoardComment[]) ?? [];
};

export const createComment = async (
  input: Omit<BoardComment, 'id' | 'created_at'>,
  board: string,
  currentCommentCount: number
): Promise<BoardComment> => {
  const comment: BoardComment = {
    ...input,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  const sb = getSupabase();
  const saveLocal = () => {
    const list = lsRead<BoardComment[]>(lsCKey(input.post_id), []);
    list.push(comment);
    localStorage.setItem(lsCKey(input.post_id), JSON.stringify(list));
    const posts = lsRead<Post[]>(lsKey(board), []);
    const idx = posts.findIndex(p => p.id === input.post_id);
    if (idx >= 0) {
      posts[idx].comment_count++;
      localStorage.setItem(lsKey(board), JSON.stringify(posts));
    }
  };
  if (!sb) { saveLocal(); return comment; }
  const { error } = await sb.from(T_COMMENTS).insert(comment);
  if (error) { saveLocal(); return comment; }
  await sb
    .from(T_POSTS)
    .update({ comment_count: currentCommentCount + 1 })
    .eq('id', input.post_id);
  return comment;
};
