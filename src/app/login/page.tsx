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
      bg="#F9F7F7"
      minW="100dvw"
      minH="100dvh"
      display="flex"
      flexDirection="column"
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
        alignSelf="stretch"
        gap="12px"
        marginRight="20px"
        marginLeft="20px"
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
          color="#949393"
          textAlign="center"
          fontSize="0.625rem"
          fontWeight={700}
          lineHeight="0.6875rem"
          letterSpacing="-0.00625rem"
        >
          가입하면 Mom4U의<br />
          이용약관 및 개인정보처리방침에 동의하게 됩니다
        </Text>
      </Box>
    </Box>
  );

  return isMobile ? content : content;
}