'use client'
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ChakraIcons } from "@/lib/withChakraIcon";

export interface SearchInventoryProps {
  onClick?: () => void;
  description: string;
}

export const SearchInventory = ({ onClick, description }: SearchInventoryProps) => {
  return (
    <Box
      position="relative"
      w="100%"
      h="1.5rem"
      display="flex"
      alignItems="center"
    >
        <ChakraIcons.ClockFiveSolid size="1rem" color="text.text1"/>

        <Text
            color="text.text1"
            textStyle="body_124002"
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
            <ChakraIcons.X size="1rem" color="text.text1"/>
        </Box>
    </Box>
  );
};
