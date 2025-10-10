"use client";

import React, { useRef } from "react";
import { Flex, Text, Textarea } from "@chakra-ui/react";

export interface LetterEditBoxProps {
  value: string;
  onChange: (value: string) => void;
  questionText: string;        
  maxLength?: number;             
}

export const LetterEditBox = ({
  value,
  onChange,
  questionText = "오늘의 질문을 불러오는 중이에요…", 
  maxLength = 300,
}: LetterEditBoxProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getLength = (str: string) => Array.from(str).length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    if (getLength(next) <= maxLength) {
      onChange(next);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      }
    }
  };

  return (
    <Flex flexDirection="column" w="100%">
      <Flex flexDirection="column" borderRadius="1rem" bg="bg.bg3" px="12px" py="13px" gap="10px">
        <Flex flexDirection="column" w="100%" borderRadius="10px" px="12px" py="8px" bg="letter">
          <Text
            textStyle="body_14400222"
            color="text.text1"
            whiteSpace="pre-line"
            wordBreak="keep-all"
            overflow="visible"
            textOverflow="clip"
            display="block"
          >
            {questionText}
          </Text>
        </Flex>

        <Textarea
          p="0"
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          textStyle="body_14400222"
          placeholder="편지 내용을 입력해 주세요"
          resize="none"
          border="none"
          _focus={{ outline: "none" }}
          wordBreak="break-all"
          whiteSpace="pre-wrap"
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
          {getLength(value)}/{maxLength}
        </Text>
      </Flex>

      <Text aria-live="polite" textStyle="caption_12400" mt="0.5rem" ml="1rem" color="text.textError">
        {maxLength}자 이내로 작성해주세요
      </Text>
    </Flex>
  );
};
