'use client';

import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';

export interface CategoryIconProps {
  page: number;
  name: string;
  imageSrc?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export const CategoryIcon = ({
  page,
  name,
  imageSrc,
  onClick,
  isSelected = false,
}: CategoryIconProps) => {
  return (
    <Box
      onClick={onClick}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="2.88rem"
      h="4rem"
      gap="0.5rem"
      cursor="pointer"
    >
      <Box
        w="2.75rem"
        h="2.75rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="0.75rem"
        bg="bg.bg3"
        border={isSelected ? "2px solid" : "none"}
        borderColor={isSelected ? "text.text1" : "transparent"}
>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={name}
            w="40px"
            h="40px"
          />
        )}
      </Box>
      <Text
        overflow="hidden"
        textOverflow="ellipsis"
        textAlign="center"
        color="text.text1"
        textStyle="body_12700"
      >
        {name}
      </Text>
    </Box>
  );
};
