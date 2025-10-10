'use client'
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ChakraIcons } from "@/lib/withChakraIcon";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

interface ToastProps {
  message?: string; 
}

export const Toast = ({ message = "정보 변경이 완료되었습니다" }: ToastProps) => (
  <MotionBox
    position="relative"    
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    }}
    display="flex"
    w="calc(100vw - 2.5rem)"
    maxW="32.5rem"
    h="3rem"
    flexDirection="row"
    alignItems="center"
    gap="0.5rem"
    borderRadius="6.1875rem"
    bg="toast.toastBg"
    backdropFilter="blur(5px)"
    pl="0.5rem"
    mx="1.25rem"
  >
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="2rem"
      h="2rem"
      borderRadius="50%"
      bg="bg.bg3"
    >
      <ChakraIcons.FunnyCircleSolid color="toast.toastBg" />
    </Box>
    <Text
      color="text.text5"
      textStyle="body_14700120"
    >
      {message}
    </Text>
  </MotionBox>
);