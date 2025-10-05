'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { exchangeOAuthToken } from '@/lib/exchangeOAuth';

export default function KakaoCallback() {
  const router = useRouter();
  const sp = useSearchParams();
  const code = sp.get('code');
  const [msg, setMsg] = useState('로그인 처리 중...');
  const once = useRef(false);
  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;

  useEffect(() => {
    if (once.current) return;
    if (!code) { setMsg('잘못된 접근입니다. (code 없음)'); return; }
    once.current = true;

    (async () => {
      try {
        const res = await exchangeOAuthToken({ apiBase: API, provider: 'KAKAO', code });
        localStorage.setItem('token', res.data.accessToken);
        router.replace(res.data.new ? '/profile/setup' : '/');
      } catch (e: any) {
        console.error('[KAKAO] exchange error', e);
        setMsg(e?.message ?? '로그인에 실패했어요. 다시 시도해주세요.');
      }
    })();
  }, [API, code, router]);

  return <Box textAlign="center" mt="20px"><Text>{msg}</Text></Box>;
}
