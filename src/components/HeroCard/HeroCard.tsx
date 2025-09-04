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
      w="calc(100vw - 2.5rem)"
      maxW="35rem"
      p="1rem"
      gap="1rem"
      flexDirection="column"
      alignItems="flex-start"
      borderRadius="1rem"
      bg="bg.bg3"
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
          color="text.text1"
          textStyle="head_188001"
          mb="0.2rem"
          w="100%"
          whiteSpace="normal"
        >
          {title}
        </Text>

        <Text
          h="1rem"
          color="text.text2"
          textStyle="body_14700120"
          mb="0.5rem"
          whiteSpace="normal"      
          overflow="visible"
          textOverflow="clip"
          wordBreak="keep-all"
        >
          {description}
        </Text>
      </Box>

      {/* 이미지 영역 */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        gap="0.625rem"
        alignSelf="stretch"
      >
<<<<<<< HEAD
        <Box
          position="relative"
          w="7.5rem"
          maxW="100%"    
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
=======
        {mode === 'imageMode' && (
          <Box
            position="relative"
            w="7.5rem"
            maxW="100%"    
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
>>>>>>> 2f360f4e6e413ee394434c1159e5c15874fe481e
      </Box>
    </Box>
  );
};
