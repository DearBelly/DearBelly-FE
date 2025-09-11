'use client';

import { Box, Text, Link as ChakraLink } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { ChakraIcons } from "@/utils/withChakraIcon";

const fallbackImage = '/images/default_image.svg';

interface InlineCardProps {
  imageDescription: string;
  description: string;
  shortcutLink: string;
  shortcutHref: string;
  imageSrc?: string;
}

export const InlineCard = ({
  imageDescription,
  description,
  shortcutLink,
  shortcutHref,
  imageSrc,
}: InlineCardProps) => {
  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      p="1rem"
      gap="0.75rem"
      borderRadius="1rem"
      bg="bg.bg3"
    >
      {/* 텍스트 영역 */}
      <Box flex="1" h="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <Text
          color="text.text2"
          textStyle="body_14700120"
          whiteSpace="normal"      
          overflow="visible"
          textOverflow="clip"
          wordBreak="keep-all"
        >
          {description}
        </Text>

        <Box display="flex" alignItems="center">
          <ChakraLink
            as={NextLink}
            href={shortcutHref}
            aria-label={`${shortcutLink} 페이지로 이동`}
            color="text.text7"
            textStyle="caption_12800"
            alignItems="center"
          >
            {shortcutLink}
            <ChakraIcons.ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} color='text.text7'/>
          </ChakraLink>
        </Box>
      </Box>

      {/* 이미지 영역 */}
      <Box
        position="relative"
        w="4rem"
        h="4rem"
        maxW="100%"
        overflow="hidden"
        flexShrink={0}
        borderRadius="0.5rem"
      >
        <Image
          src={imageSrc || fallbackImage}
          alt={imageDescription}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>
    </Box>
  );
};
