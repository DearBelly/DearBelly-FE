'use client';

import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

const default_image = '/images/icon_default_profile.svg';

export interface LetterCardProps {
  nickname: string;
  createdAt: string;     
  content: string;
  imgUrl?: string | null;
  questionText: string; 
}

export default function LetterCard({
  nickname,
  createdAt,
  content,
  imgUrl,
  questionText,
}: LetterCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Flex
      w="100%"
      flexDirection="column"
      gap="10px"
      bg="bg.bg3"
      borderRadius="1rem"
      px="12px"
      py="13px"
    >
      <Flex
        flexDirection="column"
        w="100%"
        borderRadius="10px"          
        px="12px"
        py="8px"
        bg="letter"
      >
        <Text
          textStyle="body_14400222"
          color="text.text1"
          whiteSpace="pre-line"
          wordBreak="keep-all"
          overflow="visible"
          textOverflow="clip"
          display="block"
        >
          {questionText}
        </Text>
      </Flex>

      <Text
        textStyle="body_14400222"
        color="text.text1"
        alignSelf="stretch"
        whiteSpace="pre-line"
      >
        {content}
      </Text>

      <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <Flex flexDirection="row" gap="6px" alignItems="center">
          <Image
            src={imgUrl || default_image}
            alt="profile"
            width={20}
            height={20}
            style={{ 
              objectFit: 'cover', 
              borderRadius: 999,
              display: loaded ? 'block' : 'none',
            }}
            onLoad={() => setLoaded(true)}
          />
          <Text textStyle="caption_104001">{nickname}</Text>
        </Flex>
        <Text textStyle="caption_104001">{createdAt}</Text>
      </Flex>
    </Flex>
  );
}
