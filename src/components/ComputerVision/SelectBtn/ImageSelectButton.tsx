'use client';

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ImageSelectButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

const MotionBox = motion.create(Box);

export const ImageSelectButton = ({ icon, text, onClick }: ImageSelectButtonProps) => {
  return (
    <Box px="1.25rem" w="100%" boxSizing="border-box">
      <MotionBox
        as="button"
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        w="100%"
        h="5.25rem"
        p="1rem"
        mb="2vh"
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap="0.625rem"
        flexShrink={0}
        borderRadius="1rem"
        bg="#FFF"
        border="none"
        cursor="pointer"
        _hover={{ opacity: 0.6 }}
        justifyContent="flex-start"
      >
        {icon}
        <Text
          color="#202020"
          fontFamily='var(--Font-Family-font-family, "NanumSquare Neo")'
          fontSize="0.85rem"
          fontWeight="bold"
          lineHeight="1.875rem"
          letterSpacing="-0.0175rem"
          ml="1rem"
        >
          {text}
        </Text>
      </MotionBox>
    </Box>
  );
};
