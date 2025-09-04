'use client';

import NextLink from 'next/link';
import { Box, Text, Link } from '@chakra-ui/react';

interface BottomNavigationItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

export const BottomNavigationItem = ({
  icon,
  label,
  href,
  isActive = false,
}: BottomNavigationItemProps) => {
  return (
    <Link
      as={NextLink}
      href={href}
      w="100%"
      justifyContent="center"
      gap="auto"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3px"
        pt="4px"
        pb="2px"
      >
        <Box
          w="1.5rem"
          h="1.5rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
          color={isActive ? 'icon.iconPrimary' : 'icon.icon3'}
        >
          {icon}
        </Box>
        <Text
          textStyle="caption_107001"
          textAlign="center"
          color={isActive ? 'text.text7' : 'text.text2'}
        >
          {label}
        </Text>
      </Box>
    </Link>
  );
};
