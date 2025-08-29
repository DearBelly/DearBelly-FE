'use client'
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { FunnyCircleSolid } from "@mynaui/icons-react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const Toast = () => (
  <MotionBox
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    transition={{
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    }}
    display="flex"
    w="calc(100vw - 2.5rem)"
    h="3rem"
    flexDirection="row"
    alignItems="center"
    gap="0.5rem"
    borderRadius="6.1875rem"
    bg="var(--Toast-Toast-BG, rgba(0, 0, 0, 0.50))"
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
      bg="var(--Background-3, #FFF)"
    >
      <FunnyCircleSolid color="var(--Toast-Background, rgba(0, 0, 0, 0.50))" />
    </Box>
    <Text
      color="var(--Text-5, #F2F0F0)"
      fontFamily='"NanumSquare Neo"'
      fontSize="0.875rem"
      fontStyle="normal"
      fontWeight="700"
      lineHeight="1.25rem"
      letterSpacing="-0.00875rem"
    >
      변경이 완료되었습니다
    </Text>
  </MotionBox>
);