'use client'
import React from 'react';
import { Box, Input, IconButton } from '@chakra-ui/react';
import { Search } from "@mynaui/icons-react";

export interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
}

export const SearchBox = ({
  value,
  onChange,
  onSearch,
  placeholder = "검색어를 입력해주세요",
}: SearchBoxProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClick = () => {
    if (value.trim() !== "") {
      onSearch?.(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() !== '') {
      onSearch?.(value.trim());
    }
  };

  return (
    <Box
      position="relative"
      display="flex"
      w="calc(100vw - 5rem)"
      h="2rem"
      px="0.5rem"
      pl="0.75rem"
      py="0.25rem"
      justifyContent="space-between"
      alignItems="center"
      flex="1 0 0"
      borderRadius="6.1875rem"
      bg="var(--BG-BG-2, #F2F0F0)"
    >
        <Input
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            border="none"
            outline="none"
            bg="transparent"
            color="#949393"
            fontFamily='"NanumSquare Neo"'
            fontSize="0.75rem"
            fontWeight={400}
            lineHeight="1.5rem"
            letterSpacing="-0.015rem"
            _placeholder={{
            color: "#949393",
            textAlign: "left",
            }}
        />
        <IconButton
            aria-label="검색"
            onClick={handleClick}
            bg="transparent"
            _hover={{ bg: "transparent", opacity: 0.8 }}
            _active={{ bg: "transparent" }}
            p={0}
            minW="auto"
        >
            <Search width={24} height={24} color='var(--Icon-3, #949393)' />
        </IconButton>
    </Box>
  );
};
