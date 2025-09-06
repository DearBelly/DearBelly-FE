'use client';

import React, { useState, useEffect } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { ChakraIcons } from "@/utils/withChakraIcon";
import { motion } from 'framer-motion';

interface ProfileContentProps {
  content: string;
  onClick?: () => void;
  showToggle?: boolean;
  onToggleChange?: (on: boolean) => void;
  toggleDefault?: boolean;
}

const MotionBox = motion.create(Box);

export const ProfileContent = ({
  content,
  showToggle = false,
  onToggleChange,
  onClick,
  toggleDefault = true,
}: ProfileContentProps) => {
  const [isOn, setIsOn] = useState<boolean>(toggleDefault);

  useEffect(() => {
    setIsOn(toggleDefault); 
  }, [toggleDefault]);

  // 토글 클릭 시 상태 변경
  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const next = !isOn;
    setIsOn(next);
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
    >
      <Text
        flex="1"
        color="text.text1"
        textStyle="body_14400224"
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
          bg='icon.iconPrimary'
          borderRadius="9999px"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent={isOn ? 'flex-end' : 'flex-start'}
          p="0.125rem"
          border="none"
          _hover={{ bg: 'icon.iconPrimary' }}
          <MotionBox
            w="1rem"
            h="1rem"
            borderRadius="9999px"
            bg="icon.icon5"
            layout
            transition={{ type: 'spring', duration: 0.2, bounce: 0.2 }}
          />
        </Button>
      ) : (
        <ChakraIcons.ChevronRight color='icon.icon1' />
      )}
    </Box>
  );
};
