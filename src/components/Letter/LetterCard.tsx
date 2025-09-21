"use client";

import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

export interface LetterCardProps {
  nickname: string;
  createdAt: string;
  content: string;
  imgUrl: string;
}

export default function LetterCard({ nickname, createdAt, content, imgUrl }: LetterCardProps) {
  return (
    <Box
      w="100%"
      flexDirection="column"
      display="flex"
      gap="10px"
      bg="bg.bg3"
      borderRadius="16px"
      px="12px"
      py="13px"
    >
      <Text
        textStyle="body_14400222"
        color="text.text1"
        alignSelf="stretch"
        whiteSpace="pre-line"   
      >
        {content}
      </Text>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Box display="flex" flexDirection="row" gap="6px" alignItems="center">
          <Image src={imgUrl || "/images/icon_default_profile.svg"} alt="profile" width={20} height={20} style={{ objectFit: 'cover' }}/>
          <Text textStyle="caption_104001">{nickname}</Text>
        </Box>
        <Text textStyle="caption_104001">{new Date(createdAt).toLocaleDateString()}</Text>
      </Box>
    </Box>
  );
}

