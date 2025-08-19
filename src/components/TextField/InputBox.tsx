"use client";

import React from "react";
import { Box, Input, Text } from "@chakra-ui/react";

export interface InputBoxProps {
  mode: "default" | "transparent";
  title: string;
  placeholder?: string;
  icon?: React.ReactNode;
  guideMessage?: string;
  errorMessage?: string;
  isError?: boolean;
  onClick?: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = ({
  mode,
  title,
  placeholder = "텍스트를 입력해 주세요",
  icon,
  guideMessage,
  errorMessage,
  isError = false,
  onClick,
  value,
  onChange,
}: InputBoxProps) => {
  const displayMessage = isError ? errorMessage : guideMessage;
  const messageId = displayMessage ? `input-msg-${title}` : undefined;

  return (
    <Box display="flex" flexDirection="column" w="100%">
      <Box
        borderRadius="1rem"
        bg={mode === "default" ? "bg.bg3" : "transparent"}
        px="1rem"
        py="0.75rem"
        gap="0.25rem"
      >
        <Text textStyle="caption_12700">{title}</Text>

        <Box display="flex" alignItems="center" gap="10px" mt="0.25rem">
          <Input
            type="text"
            aria-label={title}
            aria-invalid={isError || undefined}
            aria-describedby={messageId}
            data-invalid={isError ? "" : undefined}
            value={value ?? ""}
            onChange={onChange}
            placeholder={placeholder}
            variant="outline"
            border="0"
            boxShadow="none"
            px="0"
            bg="transparent"
            _placeholder={{ color: "text.text4" }}
            _focusVisible={{ boxShadow: "none", borderColor: "transparent" }}
            _hover={{ borderColor: "transparent" }}
            _invalid={{ color: "text.error" }}
            onClick={onClick}
          />
          {icon}
        </Box>
      </Box>

      {displayMessage && (
        <Text
          id={messageId}
          textStyle="caption_12400"
          mt="0.5rem"
          ml="1rem"
          color={isError ? "text.error" : "text.text3"}
        >
          {displayMessage}
        </Text>
      )}
    </Box>
  );
};
