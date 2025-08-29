'use client';

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ImageSelectButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

const MotionBox = motion(Box);

export const ImageSelectButton = ({ icon, text, onClick }: ImageSelectButtonProps) => {
  return (
    <MotionBox
      px="1.25rem"
      w="100%"
      boxSizing="border-box"
    >
      <Box
        as="button"
        display="flex"
        w="100%"
        h="5.25rem"
        p="1rem"
        flexDirection="row"
        alignItems="center"
        gap="0.625rem"
        flexShrink={0}
        borderRadius="1rem"
        bg="#FFF"
        border="none"
        cursor="pointer"
        mb="2vh"
        onClick={onClick}
      >
        {icon}
        <Text
          color="#202020"
          fontFamily='var(--Font-Family-font-family, "NanumSquare Neo")'
          fontSize="0.85rem"
          fontStyle="normal"
          fontWeight="bold"
          lineHeight="1.875rem"
          letterSpacing="-0.0175rem"
          ml="1rem"
        >
          {text}
        </Text>
      </Box>
    </MotionBox>
  );
};
