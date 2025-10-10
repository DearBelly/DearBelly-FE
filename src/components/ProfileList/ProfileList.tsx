'use client';

import { Box, Image, Text } from '@chakra-ui/react';
import { ChakraIcons } from "@/lib/withChakraIcon";
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { useState, useRef, useEffect } from 'react';
export interface ProfileListProps {
  id?: number;
  profileSrc?: string;
  name: string;
  mode: 'default' | 'transparent';
  isMe?: boolean;
  isDot?: boolean;
  babyGender?: string;
  dueDateCalculated?: string; 
}

export const ProfileList = ({
  id,
  mode = 'transparent',
  profileSrc,
  name = '알 수 없음',
  isMe = false,
  isDot = false,
  onDelete,
}: ProfileListProps & { onDelete?: (id:number) => void }) => {
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
      w="100%"
      h="3.5rem"
      px="1rem"
      display="flex"
      alignItems="center"
      gap="0.62rem"
      borderRadius="0.75rem"
      bg={mode === 'default' ? 'bg.bg3' : 'transparent'}
    >

      <Box className="profile_wrapper" w="2.5rem" h="2.5rem">
        <Box position="relative" w="2.5rem" h="2.5rem" borderRadius="full">
          <Box  position="relative" w="2.5rem" h="2.5rem" borderRadius="50%" overflow="hidden">
            <Image
              src={profileSrc || '/images/icon_default_profile.svg'}
              alt="프로필 기본"
              w="100%"
              h="100%"
              objectFit="cover"
            />
          </Box>
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
        color="text.text1"
        textStyle="body_14700120"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {name}
      </Text>

      {/* 수정, 삭제 모달 나오는 버튼 */}
      {isDot && (
        <Box ml="auto" position="relative" ref={iconRef}>
          <Box ml="auto" cursor="pointer" onClick={() => setOpen((prev) => !prev)}>
            <ChakraIcons.DotsVertical color='icon.icon1'/>
          </Box>
          {open && (
            <Box
              position="absolute"
              top="100%"
              right={0}
              mt="0.25rem"
              zIndex={1000}
            >
              <DropdownMenu babyId={id!} onDelete={onDelete}/>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};