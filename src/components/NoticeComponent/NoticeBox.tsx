'use client';

import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export interface NoticeBoxProps {
  label: string;
}

export const NoticeBox = ({ label }: NoticeBoxProps) => {
  return (
    <Box
      display="flex"
      w="100%"
      h="3.5rem"
      p="1rem"
      flexDirection="column"
      alignItems="center"
      gap="0.625rem"
      borderRadius="1rem"
      bg="#F2F0F0"
      cursor="pointer"
    >
      <Text
        color="#6C6B6B"
        fontFamily='var(--Font-Family-font-family, "NanumSquare Neo")'
        fontSize="var(--Primitive-md, 0.875rem)"
        fontStyle="normal"
        fontWeight="700"
        lineHeight="var(--Line-Height-line-height-M, 1.5rem)"
        letterSpacing="-0.00875rem"
      >
        {label}
      </Text>
    </Box>
  );
};
