'use client';

import { useRouter } from 'next/navigation';
import { Box, Text, Flex } from "@chakra-ui/react";
import { ChakraIcons } from '@/utils/withChakraIcon';

export interface TopBarProps {
  mode?: 'logo' | 'back' | 'whiteLogo';
  backgroundType?: 'filled' | 'transparent';
  title?: string;
  rightContent?: React.ReactNode;
  searchContent?: React.ReactNode;
  onBack?: () => void;
}

export const TopBar = ({
  mode = 'logo',
  backgroundType = 'filled',
  title,
  rightContent,
  searchContent,
  onBack
}: TopBarProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left="50%"           
      transform="translateX(-50%)"
      w="100%"
      maxW="40rem" 
      zIndex={1000}
      bg={backgroundType === 'transparent' ? 'transparent' : 'bg.bg1'}
    >
      <Flex
        h="44px"
        w="100%"
        justify="center"
        align="center"
        px="20px"
      >
        <Flex
          w="100%"
          h="100%"
          align="center"
          justify="space-between"
        >
          {/* 로고 모드 */}
          {mode === 'logo' && (
            <Box>
              <img
                src="/logos/logo_text.svg"
                alt="logo"
                width={102}
                height={20}
                onClick={() => router.push('/')}
              />
            </Box>
          )}

          {/* 뒤로가기 모드 */}
          {mode === 'back' && (
            <Flex align="center" gap="8px" w="100%">
              <ChakraIcons.ChevronLeft
                color="icon.icon1"
                size="24px"
                onClick={() => handleBackClick()}
              />
              {searchContent ? searchContent : (    
                <Text textStyle="body_187002" color="text.text1">
                  {title}
                </Text>
              )}
            </Flex>
          )}

          {/* 화이트 로고 모드 */}
          {mode === 'whiteLogo' && (
            <Box>
              <img
                src="/logos/white_logo_text.svg"
                alt="logo"
                width={102}
                height={20}
                onClick={() => router.push('/')}
              />
            </Box>
          )}

          {/* 우측 컨텐츠 */}
          {rightContent && (
            <Flex ml="auto">
              {rightContent}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
