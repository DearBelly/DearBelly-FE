"use client";

import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

export interface LetterCardProps {
  userName: string;
  date: string;
  content: string;
}

export default function LetterCard({ userName, date, content }: LetterCardProps) {
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
        textAlign="justify"
      >
        {content}
      </Text>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Box display="flex" flexDirection="row" gap="6px" alignItems="center">
          <Image src="/images/set_profile.svg" alt="profile" width={20} height={20} />
          <Text textStyle="caption_104001">{userName}</Text>
        </Box>
        <Text textStyle="caption_104001">{date}</Text>
      </Box>
    </Box>
  );
}
