'use client';

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ChakraIcons } from "@/utils/withChakraIcon";

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
      alignItems="center"
      justifyContent="center"
      gap="0.625rem"
      borderRadius="1rem"
      bg="bg.bg2"
      cursor="pointer"
    >
      <ChakraIcons.SparklesSolid color='icon.iconPrimary'/>
      <Text
        color="text.text2"
        textStyle="body_14700120"
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
