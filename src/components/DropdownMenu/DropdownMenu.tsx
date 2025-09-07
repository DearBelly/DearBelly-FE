'use client';

import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export const DropdownMenu = () => {
  const router = useRouter();
  const handleDetailClick = () => {
    router.push("/my-page/baby-edit");
  };

  return (
    <Box
      borderRadius="1rem"
      bg="bg.bg3"
      boxShadow="0 0 6px 0 rgba(0, 0, 0, 0.15)"
      color="text.text1"
      textStyle="body_12700"
    >
      <Box
        className='editButton'
        position="relative"
        display="flex"
        w="7.4375rem"
        p="0.875rem 1.25rem"
        alignItems="center"
        gap="0.625rem"
        borderRadius="1rem 1rem 0 0"
        bg="bg.bg3"
        _after={{
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '0.25rem',
          right: '0.25rem',
          height: '1.5px',
          background: 'border.border',
        }}
        _hover={{ bg: 'bg.bg2' }}
        onClick={handleDetailClick}
        cursor='pointer'
      >
        수정하기
      </Box>

      <Box
        className='deleteButton'
        display="flex"
        w="7.4375rem"
        p="0.875rem 1.25rem"
        alignItems="center"
        gap="0.625rem"
        alignSelf="stretch"
        borderRadius="0 0 1rem 1rem"
        bg="bg.bg3"
        _hover={{ bg: 'bg.bg2' }}
        cursor='pointer'
      >
        삭제하기
      </Box>
    </Box>
  );
};
