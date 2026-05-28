import type { UserProfile } from '../types';
import getSupabase from './supabase';

/** Supabase 영문 에러 → 한국어 변환 */
export function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('email not confirmed'))       return '이메일 인증이 완료되지 않았습니다. 받은 메일함을 확인해 주세요.';
  if (m.includes('invalid login credentials')) return '이메일 또는 비밀번호가 올바르지 않습니다.';
  if (m.includes('user already registered'))   return '이미 가입된 이메일 주소입니다.';
  if (m.includes('email already') || m.includes('already registered')) return '이미 사용 중인 이메일 주소입니다.';
  if (m.includes('password should be at least 6')) return '비밀번호는 6자 이상이어야 합니다.';
  if (m.includes('password should be at least')) return '비밀번호가 너무 짧습니다.';
  if (m.includes('email rate limit'))          return '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.';
  if (m.includes('for security purposes'))     return '보안을 위해 잠시 후 다시 시도해 주세요.';
  if (m.includes('invalid format') || m.includes('unable to validate email')) return '올바른 이메일 형식이 아닙니다.';
  if (m.includes('token has expired') || m.includes('token is invalid')) return '인증 링크가 만료되었습니다. 다시 요청해 주세요.';
  if (m.includes('new password should be different')) return '새 비밀번호는 기존 비밀번호와 달라야 합니다.';
  if (m.includes('supabase not configured'))   return '서비스 설정 오류입니다. 잠시 후 다시 시도해 주세요.';
  if (m.includes('network') || m.includes('fetch'))  return '네트워크 오류가 발생했습니다. 연결 상태를 확인해 주세요.';
  return message;
}

/** Google OAuth 로그인 */
export async function signInWithGoogle() {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + window.location.pathname }
  });
  if (error) throw error;
  return data;
}

/** Kakao OAuth 로그인 */
export async function signInWithKakao() {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: window.location.origin + window.location.pathname,
      scopes: 'profile_nickname profile_image',
    }
  });
  if (error) throw error;
  return data;
}

/** 이메일/비밀번호 로그인 */
export async function signInWithEmail(email: string, password: string) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/** 이메일 회원가입 */
export async function signUp(email: string, password: string, displayName: string) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin + import.meta.env.BASE_URL,
      data: {
        full_name: displayName,
        signup_domain: window.location.hostname,
      }
    }
  });
  if (error) throw error;
  return data;
}

/** 로그아웃 — local scope로 OAuth 세션 만료 시 에러 방지 */
export async function signOut() {
  const client = getSupabase();
  if (!client) return;
  const { error } = await client.auth.signOut({ scope: 'local' });
  if (error) throw error;
}

/** 프로필 조회 */
export async function getProfile(userId: string): Promise<UserProfile | null> {
  const client = getSupabase();
  if (!client) return null;
  const { data, error } = await client
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) {
    console.error('getProfile error:', error);
    return null;
  }
  return data as UserProfile;
}

/** 비밀번호 재설정 이메일 전송 */
export async function resetPassword(email: string) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');
  const { data, error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname
  });
  if (error) throw error;
  return data;
}

/** 프로필 업데이트 */
export async function updateProfile(
  userId: string,
  updates: Record<string, unknown>
): Promise<UserProfile | null> {
  const client = getSupabase();
  if (!client) return null;
  const { data, error } = await client
    .from('user_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data as UserProfile;
}
