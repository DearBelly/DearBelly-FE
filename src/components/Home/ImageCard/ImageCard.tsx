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
      position="relative"
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
      cursor={onClick ? "pointer" : "default"}
      onClick={onClick}
    >
      {/* 제목 뒷배경 */}
      <Box
        position="absolute"
        inset={0}
        bg="linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))"
        _dark={{
          bg: "linear-gradient(to top, rgba(32,32,32,1), rgba(32,32,32,0))"
        }}
      />

      {/* 제목 부분 */}
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        gap="4px"
        px="8px"
        pb="12px"
        h="100%"
      >
        <Text
          textStyle="caption_12800"
          lineClamp={2}
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
    </Box>
  );
};
