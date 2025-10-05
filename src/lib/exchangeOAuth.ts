export type Provider = 'NAVER' | 'GOOGLE' | 'KAKAO';

export type LoginData = {
  accessToken: string;
  email?: string;
  nickname?: string;
  socialType: Provider;
  new: boolean;
};

export type CommonResponse<T> = {
  httpStatus: number | string;
  message: string;
  data: T;
  success: boolean;
};

type Options =
  | { apiBase: string; provider: 'NAVER'; code: string; state: string }
  | { apiBase: string; provider: 'GOOGLE' | 'KAKAO'; code: string; state?: undefined };

export async function exchangeOAuthToken(opts: Options): Promise<CommonResponse<LoginData>> {
  const { apiBase, provider, code } = opts;

  const pathByProvider: Record<Provider, string> = {
    NAVER: '/api/v1/auth/naver',
    GOOGLE: '/api/v1/auth/google',
    KAKAO: '/api/v1/auth/kakao',
  };

  const qs = new URLSearchParams({ code: code });
  if (provider === 'NAVER') {
    const s = (opts as Extract<Options, { provider: 'NAVER' }>).state;
    if (!s) throw new Error('Missing state for NAVER');
    qs.set('state', s);
  }

  const url = `${apiBase}${pathByProvider[provider]}?${qs.toString()}`;

  const c = new AbortController();
  const timeout = setTimeout(() => c.abort(), 10_000);

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: { Accept: 'application/json' },
      signal: c.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  // 3) 응답 파싱 (content-type 체크 후 JSON 시도)
  const ct = res.headers.get('content-type') || '';
  const raw = await res.text();
  const tryJson = (): any => {
    if (!raw) return {};
    if (!ct.includes('application/json')) return {}; 
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  };
  const json = tryJson() as Partial<CommonResponse<Partial<LoginData>>>;

  if (!res.ok || json?.success === false) {
    const reason =
      json?.message ||
      (json as any)?.error_description ||
      (raw && !ct.includes('application/json') ? raw : '') ||
      `HTTP ${res.status}`;
    throw new Error(reason);
  }

  const data = {
    accessToken: json?.data?.accessToken ?? '',
    email: json?.data?.email,
    nickname: json?.data?.nickname,
    socialType: (json?.data?.socialType as Provider) ?? provider,
    new: Boolean(json?.data?.new),
  };

  return {
    httpStatus: json?.httpStatus ?? res.status,
    message: json?.message ?? 'success',
    data,
    success: true,
  };
}
