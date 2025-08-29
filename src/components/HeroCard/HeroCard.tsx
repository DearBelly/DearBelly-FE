'use client';

import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Button } from '@/components/Button';

const fallbackImage = '/images/default_image.png';
const buttonText = '바로가기';

export interface HeroCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  mode: 'buttonMode' | 'imageMode';
}

export const HeroCard = ({ title, description, imageSrc, mode }: HeroCardProps) => {
  return (
    <Box
      display="flex"
      w="20.9375rem"
      p="1rem"
      gap="1rem"
      flexDirection="column"
      alignItems="flex-start"
      borderRadius="1rem"
      bg="var(--BG-BG-3, #fff)"
    >
      {/* 텍스트 영역 */}
      <Box
        w="100%"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        alignSelf="stretch"
        gap="0.25rem"
      >
        <Text
          as="h2"
          color="var(--Text-Text-1, #202020)"
          fontFamily='"NanumSquare Neo"'
          fontSize="1.25rem"
          fontWeight="800"
          lineHeight="1.375rem"
          letterSpacing="-0.0125rem"
          m={0}
          w="100%"
          display="-webkit-box"
        >
          {title}
        </Text>

        <Text
          h="1rem"
          color="var(--Text-Text-2, #6C6B6B)"
          fontFamily='"NanumSquare Neo"'
          fontSize="0.875rem"
          fontWeight="700"
          lineHeight="1rem"
          letterSpacing="-0.00875rem"
          m={0}
          w="100%"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {description}
        </Text>
      </Box>

      {/* 버튼, 이미지 영역 */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent={mode === 'imageMode' ? 'flex-end' : 'flex-start'}
        gap="0.625rem"
        alignSelf="stretch"
      >
        {mode === 'imageMode' && (
          <Box
            position="relative"
            w="7.5rem"
            h="5rem"
            overflow="hidden"
            flexShrink={0}
            borderRadius="0.5rem"
          >
            <Image
              src={imageSrc || fallbackImage}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
        )}
        {mode === 'buttonMode' && (
          <Button type="secondary" size="small" width="7.875rem">
            {buttonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};
