'use client';

import React from 'react';
import { Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export interface BottomBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const MotionButton = motion.create(Button);

export const BottomBtn = ({ children, onClick }: BottomBtnProps) => {
  return (
    <MotionButton
      onClick={onClick}
      w="calc(100% - 2.5rem)"
      h="2.5rem"
      mt="1.25rem"
      mb="2.12rem"
      mx="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="var(--Button-Solid-Primary, #FF6257)"
      color="var(--text-text-5-inverse, #F2F0F0)"
      fontFamily="'NanumSquare Neo', sans-serif"
      fontSize="0.625rem"
      fontWeight="800"
      lineHeight="0.875rem"
      letterSpacing="-0.00625rem"
      border="none"
      borderRadius="6.1875rem"
      cursor="pointer"
    >
      {children}
    </MotionButton>
  );
};
