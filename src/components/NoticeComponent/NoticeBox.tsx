'use client';

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { SparklesSolid } from "@mynaui/icons-react";

export interface NoticeBoxProps {
  label: string;
}

export const NoticeBox = ({ label }: NoticeBoxProps) => {
  return (
    <Box
      display="flex"
      w="100%"
      p="1rem"
      flexDirection="row"
      // alignItems="center"
      // justifyContent="center" 
      alignItems="flex-start"
      gap="0.625rem"
      borderRadius="1rem"
      bg="#F2F0F0"
      cursor="pointer"
    >
      <SparklesSolid color='#FF6257'/>
      <Text
        color="#6C6B6B"
        fontFamily='var(--Font-Family-font-family, "NanumSquare Neo")'
        fontSize="var(--Primitive-md, 0.875rem)"
        fontStyle="normal"
        fontWeight="700"
        lineHeight="var(--Line-Height-line-height-M, 1.5rem)"
        letterSpacing="-0.00875rem"
        whiteSpace="normal"       
        overflow="visible"        
        textOverflow="clip"  
        wordBreak="keep-all"   
      >
        {label}
      </Text>
    </Box>
  );
};
