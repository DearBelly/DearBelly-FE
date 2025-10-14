"use client";

import React, { useState } from "react";
import { Box, Text, Field } from "@chakra-ui/react";
import DatePicker from 'react-date-picker';
import './CalendarPicker.css';
import { ChakraIcons } from "@/lib/withChakraIcon";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface CalendarInputBoxProps {
  mode?: "default" | "transparent";
  title: string;
  guideMessage?: string;
  errorMessage?: string;
  isError?: boolean;
  isDisabled?: boolean;
}

export const CalendarInputBox = ({
  mode = "default",
  title,
  guideMessage,
  errorMessage,
  isError = false,
  isDisabled = false,
}: CalendarInputBoxProps) => {
  const [value, setValue] = useState<Value>(new Date());

  
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
          position="relative"
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

          <Box
            position="absolute"
            left="1rem"
            top="3rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <DatePicker
              value={value}
              onChange={(val) => setValue(val)}
              format="yyyy.MM.dd"
              maxDetail="month"
              calendarIcon={null}
              clearIcon={null}
              disabled={isDisabled}
            />
          </Box>

          <Box
            position="absolute"
            right="1rem"
            bottom="1rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ChakraIcons.Calendar color="icon.icon1" />
          </Box>
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
