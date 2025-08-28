'use client';

import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export const DropdownMenu = () => {
  const router = useRouter();
  const handleDetailClick = () => {
    router.push(`/mypage/babyEdit`);
  };

  return (
    <Box
      borderRadius="1rem"
      bg="var(--Background-3, #FFF)"
      boxShadow="0 0 6px 0 rgba(0, 0, 0, 0.15)"
      color="var(--Text-1, #202020)"
      fontFamily='"NanumSquare Neo"'
      fontSize="0.75rem"
      fontWeight="700"
      lineHeight="0.75rem"
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
        bg="var(--Background-3, #FFF)"
        _after={{
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '0.25rem',
          right: '0.25rem',
          height: '1.5px',
          background: 'var(--Border-Border, #E8E7E7)',
        }}
        _hover={{ bg: 'var(--Background-2, #F2F0F0)' }}
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
        bg="var(--Background-3, #FFF)"
        _hover={{ bg: 'var(--Background-2, #F2F0F0)' }}
        cursor='pointer'
      >
        삭제하기
      </Box>
    </Box>
  );
};
