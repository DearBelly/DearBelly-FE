'use client';

import { Box, Text } from "@chakra-ui/react";

interface ImageCardProps {
  imageUrl: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export const ImageCard = ({ imageUrl, title, description, onClick }: ImageCardProps) => {
  return (
    <Box
      w="30.0970873786dvw" 
      minW="186px"
      maxW="193.33px"
      h="140px"
      borderRadius="8px"
      overflow="hidden"
      flex="0 0 auto" 
      bgImage={`url(${imageUrl})`}
      bgSize="cover"
      bgPos="center"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"      
      gap="4px"
      px="8px"
      pb="12px"
      onClick={onClick}
    >
      <Text
        textStyle="caption_12800"
        color="text.text1"
        lineClamp="2"
      >
        {title}
      </Text>
      <Text
        textStyle="caption_107001"
        color="text.text2"
        truncate
      >
        {description}
      </Text>
    </Box>
  );
};
