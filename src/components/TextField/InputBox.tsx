"use client";

import React from "react";
import { Box, Text, Field, Input, InputGroup } from "@chakra-ui/react";

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
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  name?: string;
  readOnly?: boolean;
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
  type = "text",
  inputMode,
  maxLength,
  name,
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
        pt="1rem"
        pb="0.75rem"
        gap="0.5rem"
      >
        <Text textStyle="caption_12800" color="text.text1">{title}</Text>

        <Box>
            <Field.Label htmlFor={safeId} srOnly>
              {title}
            </Field.Label>

            <InputGroup endElement={icon}>
              <Input
                id={safeId}
                name={name}
                type={type}
                inputMode={inputMode}
                maxLength={maxLength}
                variant="outline"
                textStyle="body_14400224"
                css={{ "--input-border-width": "0px" }}
                border="0"
                boxShadow="none"
                px="0"
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
                readOnly={readOnly}   
              />
            </InputGroup>
          </Box>
        </Box>
      </Box>
      {isError ? (
              <Field.ErrorText aria-live="assertive" textStyle="caption_12400" mt="0.5rem" ml="1rem" color="text.textError">
                {errorMessage ?? "입력을 확인해 주세요."}
              </Field.ErrorText>
            ) : (
              guideMessage && (
                <Field.HelperText aria-live="polite" textStyle="caption_12400" mt="0.5rem" ml="1rem" color="text.text3">
                  {guideMessage}
                </Field.HelperText>
              )
            )}
    </Field.Root>
  );
};
