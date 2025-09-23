'use client';

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { SocialLoginButton } from '@/components/SocialLoginButton/SocialLoginButton';

export default function Login() {
  const handleNaverLogin = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/naver`);
    const data = await res.json();
    if (data.success) {
      window.location.href = data.data; // 네이버 로그인 페이지로 이동
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/url/google`);
      const json = await res.json();
  
      if (json.success && json.data) {
        window.location.href = json.data; 
      }
    } catch (err) {
      console.error("구글 로그인 URL 요청 실패", err);
    }
  };
  
  const handleKakaoLogin = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/url/kakao`);
    const data = await res.json();
    if (data.success) {
      window.location.href = data.data; 
    }
  };
  
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
        <Image
          src="/logos/logo.svg"
          alt="로고"
          width={112.5}
          height={86.25}
          priority
        />
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
        <SocialLoginButton provider="naver" onClick={handleNaverLogin}/>
        <SocialLoginButton provider="google" onClick={handleGoogleLogin}/>
        <SocialLoginButton provider="kakao" onClick={handleKakaoLogin}/>
      </Box>

      <Box
        mt="3.94dvh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        alignSelf="stretch"
      >
        <Text
          color="text.text3"
          textAlign="center"
          textStyle="caption_107001"
        >
          가입하면 Mom4U의<br />
          이용약관 및 개인정보처리방침에 동의하게 됩니다
        </Text>
      </Box>
    </Box>
  );
}