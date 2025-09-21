"use client";

import React from "react";
import { Box, Text, Field, Input } from "@chakra-ui/react";

export interface InputBoxProps {
  mode?: "default" | "transparent";
  title: string;
  placeholder?: string;
  guideMessage?: string;
  errorMessage?: string;
  isError?: boolean;
  onClick?: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  isDisabled?: boolean;
  readOnly?: boolean;
}

export const InputBox = ({
  mode = "default",
  title,
  placeholder = "텍스트를 입력해 주세요",
  guideMessage,
  errorMessage,
  isError = false,
  onClick,
  value,
  onChange,
  type = "text",
  inputMode,
  maxLength,
  isDisabled = false,
  readOnly = false,
}: InputBoxProps) => {
  const safeId = `input-${title}`.replace(/\s+/g, "-").toLowerCase();

  return (
    <Field.Root invalid={isError}>
      <Box display="flex" flexDirection="column" w="100%">
        <Box
          borderRadius="1rem"
          bg={mode === "default" ? "bg.bg3" : "transparent"}
          px="1rem"
          py="0.75rem"
          display="flex"
          flexDirection="column"
          gap="0.25rem"
        >
          <Text
            textStyle="caption_12800"
            color="text.text1"
            h="22px"
            display="flex"
            alignItems="center"
          >
            {title}
          </Text>
          <Input
            id={safeId}
            type={type}
            inputMode={inputMode}
            maxLength={maxLength}
            variant="outline"
            textStyle="body_14400224"
            css={{ "--input-border-width": "0px" }}
            border="0"
            boxShadow="none"
            px="0"
            py="0"
            h="24px"
            lineHeight="24px"
            bg="transparent"
            placeholder={placeholder}
            value={value ?? ""}
            onChange={readOnly ? undefined : onChange}     
            onClick={onClick}
            aria-invalid={isError || undefined}
            data-invalid={isError ? "" : undefined}
            _placeholder={{ color: "text.text4" }}
            _focusVisible={{
              boxShadow: "none",
              borderColor: "transparent",
              outline: "none",
              "--input-border-width": "0px",
            }}
            _hover={{ borderColor: "transparent", "--input-border-width": "0px" }}
            _invalid={{ color: "text.textError" }}
            autoComplete="one-time-code"
            disabled={isDisabled}
            readOnly={readOnly}   
          />
        </Box>
      </Box>
      {isError ? (
        <Field.ErrorText
          aria-live="assertive"
          textStyle="caption_12400"
          mt="0.5rem"
          ml="1rem"
          color="text.textError"
        >
          {errorMessage ?? "입력을 확인해 주세요."}
        </Field.ErrorText>
      ) : (
        guideMessage && (
          <Field.HelperText
            aria-live="polite"
            textStyle="caption_12400"
            mt="0.5rem"
            ml="1rem"
            color="text.text3"
          >
            {guideMessage}
          </Field.HelperText>
        )
      )}
    </Field.Root>
  );
};
