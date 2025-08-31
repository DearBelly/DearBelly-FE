'use client';

import { Box, Text, Link as ChakraLink } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { ChevronRight } from '@mynaui/icons-react';

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
      w="calc(100vw - 2.5rem)"
      h="100%"
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      p="1rem"
      gap="0.75rem"
      borderRadius="1rem"
      bg="var(--BG-BG-4, #e8e7e7)"
    >
      {/* 텍스트 영역 */}
      <Box flex="1" h="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <Text
          color="var(--Text-Text-2, #6c6b6b)"
          m="0"
          fontSize="0.875rem"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="1rem"
          letterSpacing="-0.00875rem"
          display="-webkit-box"
        >
          {description}
        </Text>

        <Box display="flex" alignItems="center">
          <ChakraLink
            as={NextLink}
            href={shortcutHref}
            aria-label={`${shortcutLink} 페이지로 이동`}
            color="var(--Text-Text-8, #de473d)"
            fontSize="0.75rem"
            fontWeight="800"
            lineHeight="0.875rem"
            letterSpacing="-0.0075rem"
            textDecoration="none"
            display="inline-flex"
            alignItems="center"
          >
            {shortcutLink}
            <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
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
