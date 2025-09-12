"use client";

import React, { useRef } from "react";
import { Box, Text, Textarea } from "@chakra-ui/react";

export interface LetterEditBoxProps {
  content: string;
  onChange?: (value: string) => void;
}

export const LetterEditBox = ({ content = "", onChange }: LetterEditBoxProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getLength = (str: string) => Array.from(str).length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (getLength(value) <= 300) {
      onChange?.(value);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" w="100%">
      <Box borderRadius="1rem" bg="bg.bg3" px="12px" py="13px" gap="10px">
        <Textarea
          p="0"
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          textStyle="body_14400222"
          placeholder="편지 내용을 입력해 주세요"
          resize="none"
          border="none"
          maxHeight="300px"
          _focus={{ outline: "none" }}
          wordBreak="break-all"
        />

        <Text
          textStyle="body_12700"
          color="text.text3"
          display="flex"
          height="20px"
          justifyContent="flex-end"
          alignItems="center"
          alignSelf="stretch"
        >
          {getLength(content)}/300
        </Text>
      </Box>

      <Text
        aria-live="polite"
        textStyle="caption_12400"
        mt="0.5rem"
        ml="1rem"
        color="text.textError"
      >
        최대 300자까지 입력 가능합니다.
      </Text>
    </Box>
  );
};
