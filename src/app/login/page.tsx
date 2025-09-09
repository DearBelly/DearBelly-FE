'use client';

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useGetBreakPointValue } from '../../context/BreakPointProvider';
import { SocialLoginButton } from '@/components/SocialLoginButton/SocialLoginButton';

export default function Login() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;
  const content = (
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
        <SocialLoginButton provider="naver" />
        <SocialLoginButton provider="google" />
        <SocialLoginButton provider="kakao" />
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
  return isMobile ? content : content;
}