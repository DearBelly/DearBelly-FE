'use client';

import React, { useState, useEffect } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { ChevronRight } from '@mynaui/icons-react';
import { motion } from 'framer-motion';

interface ProfileContentProps {
  content: string;
  onClick?: () => void;
  showToggle?: boolean;
  onToggleChange?: (on: boolean) => void;
}

const MotionBox = motion.create(Box);

export const ProfileContent = ({
  content,
  showToggle = false,
  onToggleChange,
  onClick,
}: ProfileContentProps) => {
  const [isOn, setIsOn] = useState<boolean>(true);

  // 마운트 시 로컬 스토리지 값 반영
  useEffect(() => {
    const lightMode_save = localStorage.getItem('lightMode');
    if (lightMode_save !== null) {
      setIsOn(lightMode_save === 'true');
    } else {
      localStorage.setItem('lightMode', 'true');
    }
  }, []);

  // 토글 클릭 시 상태 변경
  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const next = !isOn;
    setIsOn(next);

    localStorage.setItem('lightMode', String(next));
    localStorage.setItem('chakra-ui-color-mode', next ? 'light' : 'dark');
    onToggleChange?.(next);
  };

  return (
    <Box
      display="flex"
      h="2.5rem"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      pl="0.5rem"
      cursor="pointer"
      onClick={showToggle ? undefined : onClick}
      role={!showToggle && onClick ? 'button' : undefined}
    >
      <Text
        flex="1"
        color="var(--Text-Text-1, #202020)"
        fontFamily='"NanumSquare Neo"'
        fontSize="0.875rem"
        fontWeight="400"
        lineHeight="1.5rem"
        letterSpacing="-0.0175rem"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {content}
      </Text>
      {showToggle ? (
        <Button
          onClick={handleToggleClick}
          aria-pressed={isOn}
          w="2.5rem"
          h="1.375rem"
          bg={isOn ? '#FF6257' : '#FF746a'}
          borderRadius="9999px"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent={isOn ? 'flex-end' : 'flex-start'}
          p="0.125rem"
          border="none"
          _hover={{ bg: isOn ? '#FF6257' : '#FF746a' }}
        >
          <MotionBox
            w="1rem"
            h="1rem"
            borderRadius="9999px"
            bg="#FFF"
            layout
            transition={{ type: 'spring', duration: 0.2, bounce: 0.2 }}
          />
        </Button>
      ) : (
        <ChevronRight />
      )}
    </Box>
  );
};
