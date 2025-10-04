'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

export default function NaverCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get('code');
  const state = params.get('state');
  const [msg, setMsg] = useState('로그인 처리 중...');
  const once = useRef(false);
  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;

  useEffect(() => {
    if (once.current) return;
    if (!code || !state) {
      setMsg('잘못된 접근입니다. (code/state 없음)');
      return;
    }
    once.current = true;

    (async () => {
      try {
        const res = await fetch(`${API}/api/v1/auth/naver?code=${code}&state=${state}`, {
          method: 'POST',
          credentials: 'include',
          headers: { Accept: 'application/json' },
        });

        const data = await res.json().catch(() => ({}));
        console.log('[NAVER EXCHANGE]', res.status, data);

        if (!res.ok || data?.success === false) {
          throw new Error(data?.message || `HTTP ${res.status}`);
        }

        if (data?.data?.accessToken) {
          localStorage.setItem('token', data.data.accessToken);
        }

        const isNew = data?.data?.new === true;
        router.replace(isNew ? '/profile/setup' : '/');
      } catch (e: any) {
        console.error('Naver login error:', e);
        setMsg(e?.message ?? '로그인에 실패했어요. 다시 시도해주세요.');
      }
    })();
  }, [API, code, state, router]);

  return (
    <Box textAlign="center" mt="20px">
      <Text>{msg}</Text>
    </Box>
  );
}
