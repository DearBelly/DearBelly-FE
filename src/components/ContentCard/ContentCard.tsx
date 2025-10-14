'use client';

import { Box, Text, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

const fallbackImage = '/images/default_image.png';

export interface ContendCardProps {
  id: number;
  title: string;
  subTitle: string;
  imageSrc?: string;
  routerSrc?: string;
  onClick?: () => void;
  isLast?: boolean;
}

export const ContendCard = ({
  id,
  title,
  subTitle,
  imageSrc,
  isLast,
}: ContendCardProps) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const handleDetailClick = () => {
    router.push(`/info/detail/${id}`);
  };

  return (
    <Box
      display="flex"
      w="100%"
      p="0.75rem 0"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap="0.625rem"
      cursor="pointer"
      borderBottom={isLast ? "none" : "0.0625rem solid"}
      borderColor={isLast ? "transparent" : "border.border"}
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
          color="text.text1"
          textStyle="body_168001"
        >
          {title}
        </Heading>
        <Text
          overflow="hidden"
          color="text.text3"
          textStyle="body_14700120"
          mt="0.5rem"
        >
          {subTitle}
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
          style={{ 
            objectFit: 'cover',
            display: loaded ? 'block' : 'none',
          }}
          onLoad={() => setLoaded(true)}
        />
      </Box>
    </Box>
  );
};
