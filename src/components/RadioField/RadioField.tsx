'use client';

import React from 'react';
import { Box, Input, Text } from '@chakra-ui/react';

interface RadioFieldProps {
  label: string;
  checked: boolean;
  onClick?: () => void;
  name?: string;
  value?: string;
}

export const RadioField = ({
  label,
  checked,
  onClick,
  name,
  value,
}: RadioFieldProps) => {
  return (
    <Box
      as="label"
      cursor="pointer"
      display="flex"
      alignItems="center" 
      gap="0.25rem"          
      flexDirection="row"
      w="100%"
      pb="4px"
    >
      <Input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onClick}
        display="none"
      />
      <Box
        w="16px"
        h="16px"
        border="1px solid"
        borderColor="border.border"
        borderRadius="full"
        position="relative"
        display="flex"        
        alignItems="center"
        justifyContent="center"
      >
        {checked && (
          <Box
            w="10px"
            h="10px"
            bg="icon.iconPrimary"
            borderRadius="full"
          />
        )}
      </Box>
      <Text
        color={checked ? 'text.text1' : 'text.text3'}
        textStyle="body_14400224"
      >
        {label}
      </Text>
    </Box>
  );
};
