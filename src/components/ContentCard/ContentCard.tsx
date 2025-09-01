'use client';

import { Box, Text, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const fallbackImage = '/images/default_image.png';

export interface ContendCardProps {
  id: number;
  title: string;
  description: string;
  imageSrc?: string;
  routerSrc?: string;
  onClick?: () => void;
  isLast?: boolean;
}

export const ContendCard = ({
  id,
  title,
  description,
  imageSrc,
  isLast,
}: ContendCardProps) => {
  const router = useRouter();
  const handleDetailClick = () => {
    router.push(`/info/detail`);
  };

  return (
    <Box
      display="flex"
      w="calc(100vw - 2.5rem)"
      p="0.75rem 0"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap="0.625rem"
      cursor="pointer"
      borderBottom={isLast ? 'none' : '0.0625rem solid #E8E7E7'}
      onClick={handleDetailClick}
    >
      {/* textWrapper */}
      <Box
        w="100%"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        alignSelf="stretch"
        p="0.75rem 0"
      >
        <Heading
          as="h2"
          overflow="hidden"
          color="var(--Text-Text-1, #202020)"
          textOverflow="ellipsis"
          fontFamily='"NanumSquare Neo"'
          fontSize="0.875rem"
          fontStyle="normal"
          fontWeight="800"
          lineHeight="1.125rem"
          letterSpacing="-0.00875rem"
        >
          {title}
        </Heading>
        <Text
          overflow="hidden"
          color="var(--Text-Text-3, #949393)"
          textOverflow="ellipsis"
          fontFamily='"NanumSquare Neo"'
          fontSize="0.75rem"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="1rem"
          letterSpacing="-0.0075rem"
          mt="0.5rem"
        >
          {description}
        </Text>
      </Box>

      {/* imageWrapper */}
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
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>
    </Box>
  );
};
