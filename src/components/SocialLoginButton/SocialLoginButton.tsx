'use client'
import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

export interface SocialLoginButtonProps {
  provider: 'naver' | 'google' | 'kakao';
  onClick?: () => void;
}

const providerInfo = {
  naver: {
    label: '네이버 계정으로 시작하기',
    icon: '/logos/naver.svg',
    bg: '#03C75A',
    color: '#FFF',
  },
  google: {
    label: '구글 계정으로 시작하기',
    icon: '/logos/google.svg',
    bg: '#FFF',
    color: '#202020',
  },
  kakao: {
    label: '카카오 계정으로 시작하기',
    icon: '/logos/kakao.svg',
    bg: '#FEE500',
    color: '#202020',
  },
};

export const SocialLoginButton = ({ provider, onClick }: SocialLoginButtonProps) => {
  const { label, icon, bg, color } = providerInfo[provider];

  return (
    <Box
      as="button"
      onClick={onClick}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="0.625rem"
      border="none"
      borderRadius="3.125rem"
      fontSize="1rem"
      fontWeight="500"
      cursor="pointer"
      w="100%"
      h="3rem"
      minW="320px"
      bg={bg}
      color={color}
      _hover={{ opacity: 0.9 }}
    >
      <Image src={icon} alt={`${provider} 아이콘`} w="1.5rem" h="1.5rem" />
      <Text textStyle="body_148001">{label}</Text>
    </Box>
  );
};
