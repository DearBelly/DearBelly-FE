'use client';

import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { SocialLoginButton } from '@/components/SocialLoginButton/SocialLoginButton';

type Provider = 'naver' | 'google' | 'kakao';

type CommonResponse<T = unknown> = {
  httpStatus: number | string;
  message: string;
  data: T;
  success: boolean;
};

export default function Login() {
  const [loading, setLoading] = useState<Provider | null>(null);
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  async function getAuthUrl(provider: Provider): Promise<string> {
    const path =
      provider === 'naver'
        ? '/api/v1/auth/naver' 
        : `/api/v1/auth/url/${provider}`;

    const res = await fetch(`${API}${path}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      credentials: 'include',
    });

    let json: Partial<CommonResponse<string>> = {};
    try {
      json = await res.json();
    } catch {
    }
    if (!res.ok || !json?.success || typeof json?.data !== 'string') {
      throw new Error(json?.message || `Failed to get auth url (${res.status})`);
    }
    return json.data;
  }

  async function handleLogin(provider: Provider) {
    if (loading) return;
    setLoading(provider);
    try {
      const url = await getAuthUrl(provider);
      window.location.assign(url);
    } catch (e) {
      console.error(`[${provider}] 로그인 URL 요청 실패`, e);
      alert('로그인 준비 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <Box
      bg="bg.bg1"
      minW="100dvw"
      minH="100dvh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box mt="23.6dvh" display="flex" justifyContent="center">
        <Image src="/logos/logo.svg" alt="로고" width={112.5} height={86.25} priority />
      </Box>

      <Box
        mt="20.7dvh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="12px"
        w="100%"
        maxW="40rem"
        px="20px"
      >
        <SocialLoginButton
          provider="naver"
          onClick={() => handleLogin('naver')}
        />
        <SocialLoginButton
          provider="google"
          onClick={() => handleLogin('google')}
        />
        <SocialLoginButton
          provider="kakao"
          onClick={() => handleLogin('kakao')}
        />
      </Box>

      <Box mt="3.94dvh" display="flex" justifyContent="center" alignItems="center" alignSelf="stretch">
        <Text color="text.text3" textAlign="center" textStyle="caption_107001">
          가입하면 Mom4U의<br />
          이용약관 및 개인정보처리방침에 동의하게 됩니다
        </Text>
      </Box>
    </Box>
  );
}
