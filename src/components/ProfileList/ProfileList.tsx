'use client';

import { Box, Image, Text } from '@chakra-ui/react';
import { DotsVertical } from '@mynaui/icons-react';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { useState, useRef, useEffect } from 'react';
<<<<<<< HEAD
=======
        
>>>>>>> 701f1ccc2ea1c5ba3b9861b5102e05fe337ee06c
export interface ProfileListProps {
  id?: number;
  profileSrc?: string;
  name: string;
  mode: 'default' | 'transparent';
  isMe?: boolean;
  isDot?: boolean;
  babyGender?: string;
}

export const ProfileList = ({
  mode = 'transparent',
  profileSrc,
  name = '알 수 없음',
  isMe = false,
  isDot = false,
}: ProfileListProps) => {
<<<<<<< HEAD
=======

>>>>>>> 701f1ccc2ea1c5ba3b9861b5102e05fe337ee06c
  const [open, setOpen] = useState(false);
  const iconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (iconRef.current && !iconRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Box
      w="calc(100vw - 2.5rem)"
      h="3.5rem"
      px="1rem"
      display="flex"
      alignItems="center"
      gap="0.62rem"
      borderRadius="0.75rem"
      bg={mode === 'default' ? 'var(--Background-3, #FFF)' : 'transparent'}
    >

      <Box className="profile_wrapper" w="2.5rem" h="2.5rem">
        <Box position="relative" w="2.5rem" h="2.5rem" borderRadius="full">
          <Image
            src={profileSrc || '/images/profile.svg'}
            alt="프로필 기본"
            w="100%"
            h="100%"
            objectFit="cover"
          />
          {isMe && (
            <Image
              src="/images/me.svg"
              alt="내 표시"
              position="absolute"
              bottom={0}
              right={0}
            />
          )}
        </Box>
      </Box>

      <Text
        className='name'
        overflow="hidden"
        color="var(--Text-1, #202020)"
        fontFamily='"NanumSquare Neo"'
        fontSize="0.875rem"
        fontWeight="700"
        lineHeight="1.25rem"
        letterSpacing="-0.00875rem"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {name}
      </Text>

      {/* 수정, 삭제 모달 나오는 버튼 */}
      {isDot && (
        <Box ml="auto" position="relative" ref={iconRef}>
          <Box ml="auto" cursor="pointer" onClick={() => setOpen((prev) => !prev)}>
            <DotsVertical />
          </Box>
          {open && (
            <Box
              position="absolute"
              top="100%"
              right={0}
              mt="0.25rem"
              zIndex={1000}
            >
              <DropdownMenu />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
