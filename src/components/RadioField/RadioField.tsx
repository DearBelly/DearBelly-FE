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
        as="span"
        w="1rem"
        h="1rem"
        border="2px solid #D0D0D0"
        borderRadius="50%"
        position="relative"
        display="inline-block"
      >
        {checked && (
          <Box
            as="span"
            w="0.625rem"
            h="0.625rem"
            bg="#FF6257"
            borderRadius="50%"
            boxSizing="border-box"
            border="1px solid var(--Border-Border, #E8E7E7)"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          />
        )}
      </Box>
      <Text
        color={checked ? '#202020' : '#D0D0D0'}
        fontFamily='var(--Font-Family-font-family, "NanumSquare Neo")'
        fontSize="0.875rem"
        fontWeight={400}
        lineHeight="1.875rem"
        letterSpacing="-0.0175rem"
      >
        {label}
      </Text>
    </Box>
  );
};
