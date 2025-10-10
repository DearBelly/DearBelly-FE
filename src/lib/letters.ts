import type {
  LettersFeedResponse,
  TodayLetterResponse,
  MonthlyLettersResponse,
  LetterDetailResponse,
} from '@/types/letters';

const API = process.env.NEXT_PUBLIC_API_BASE_URL!;
function url(p: string) {
  if (!API) throw new Error('ENV: NEXT_PUBLIC_API_BASE_URL 미설정');
  return `${API}${p}`;
}
function auth(): Headers {
  const h = new Headers();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) h.set('Authorization', `Bearer ${token}`);
  return h;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const base = new Headers({ Accept: 'application/json' }); 
  auth().forEach((v, k) => base.set(k, v));

  if (init?.headers) new Headers(init.headers).forEach((v, k) => base.set(k, v));

  const res = await fetch(url(path), {
    credentials: 'include',
    ...init,
    headers: base, 
  });

  if (!res.ok) throw new Error(`${init?.method || 'GET'} ${path} 실패: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function fetchLettersFeed(cursor?: string | null, size = 20) {
  const q = new URLSearchParams();
  if (cursor) q.set('cursor', cursor);
  if (size) q.set('size', String(size));
  return request<LettersFeedResponse>(`/api/v1/letters/feed${q.toString() ? `?${q}` : ''}`);
}

export async function fetchTodayLetter() {
  return request<TodayLetterResponse>('/api/v1/letters/today');
}

export async function fetchMonthlyLetters(year?: number, month?: number) {
  const q = new URLSearchParams();
  if (year) q.set('year', String(year));
  if (month) q.set('month', String(month));
  return request<MonthlyLettersResponse>(`/api/v1/letters${q.toString() ? `?${q}` : ''}`);
}

export async function fetchLetterDetail(id: number) {
  return request<LetterDetailResponse>(`/api/v1/letters/${id}`);
}
 
export async function createLetter(content: string) {
  return request<ApiSuccessEmpty>('/api/v1/letters', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
}

export async function updateLetter(id: number, content: string) {
  return request<ApiSuccessEmpty>(`/api/v1/letters/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
}

export async function deleteLetter(id: number) {
  return request<ApiSuccessEmpty>(`/api/v1/letters/${id}`, { method: 'DELETE' });
}

type ApiSuccessEmpty = {
  httpStatus: number;
  message: string;
  data: Record<string, never>;
  success: boolean;
};
