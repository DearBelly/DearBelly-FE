'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { exchangeOAuthToken } from '@/lib/exchangeOAuth';

export default function NaverCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get('code');
  const state = params.get('state');
  const [message, setMessage] = useState('로그인 처리 중...');
  const once = useRef(false);
  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;

  useEffect(() => {
    if (once.current) return;
    if (!code || !state) { setMessage('잘못된 접근입니다.(code/state 없음)'); return; }
    once.current = true;

    (async () => {
      try {
        const json = await exchangeOAuthToken({ apiBase: API, provider: 'NAVER', code, state });
        if (json.data?.accessToken) localStorage.setItem('token', json.data.accessToken);
        const isNew = json.data?.new === true;
        router.replace(isNew ? '/profile/setup' : '/');
      } catch (e: any) {
        console.error('Naver login error:', e);
        setMessage(e?.message ?? '로그인에 실패했어요. 다시 시도해주세요.');
      }
    })();
  }, [API, code, state, router]);

  return <Box textAlign="center" mt="20px"><Text>{message}</Text></Box>;
}
