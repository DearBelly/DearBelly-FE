'use client'
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ClockFiveSolid, X } from "@mynaui/icons-react";

export interface SearchInventoryProps {
  onClick?: () => void;
  description: string;
}

export const SearchInventory = ({ onClick, description }: SearchInventoryProps) => {
  return (
    <Box
      position="relative"
      w="calc(100vw - 2.5rem)"
      h="1.5rem"
      display="flex"
      alignItems="center"
    >
        <ClockFiveSolid size="1rem" />

        <Text
            color="var(--Text-Text-1, #202020)"
            fontFamily='"NanumSquare Neo"'
            fontSize="0.625rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="1.5rem"
            letterSpacing="-0.0125rem"
            ml="0.38rem"
        >
            {description}
        </Text>

        <Box
            as="button"
            onClick={onClick}
            ml="auto"
            bg="transparent"
            border="none"
            p={0}
            minW="auto"
            h="auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
        >
            <X size="1rem" />
        </Box>
    </Box>
  );
};
