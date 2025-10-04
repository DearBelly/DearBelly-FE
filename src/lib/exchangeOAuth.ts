export type Provider = 'NAVER' | 'GOOGLE' | 'KAKAO';

type CommonResponse<T = any> = {
  httpStatus: number | string;
  message: string;
  data: T;
  success: boolean;
};

export async function exchangeOAuthToken(opts: {
  apiBase: string;
  provider: Provider;
  code: string;
  state?: string | null;
}) {
  const { apiBase, provider, code, state } = opts;

  const url =
    provider === 'NAVER'
      ? `${apiBase}/api/v1/auth/naver?code=${encodeURIComponent(code)}&state=${encodeURIComponent(
          state || ''
        )}`
      : provider === 'GOOGLE'
      ? `${apiBase}/api/v1/auth/google?code=${encodeURIComponent(code)}`
      : `${apiBase}/api/v1/auth/kakao?code=${encodeURIComponent(code)}`;

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });

  const raw = await res.text();
  let json: CommonResponse<any> | any = {};
  try { json = raw ? JSON.parse(raw) : {}; } catch {}

  if (!res.ok || json?.success === false) {
    const reason = json?.message || json?.error_description || `HTTP ${res.status}`;
    throw new Error(reason);
  }
  return json as CommonResponse<{ accessToken?: string; new?: boolean }>;
}
