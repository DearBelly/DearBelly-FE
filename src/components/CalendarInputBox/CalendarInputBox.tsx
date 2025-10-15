"use client";

import React, { useState } from "react";
import { Box, Text, Field, Grid } from "@chakra-ui/react";
import DatePicker from "react-date-picker";
import "./CalendarPicker.css";
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
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
}

export const CalendarInputBox = ({
  mode = "default",
  title,
  guideMessage,
  errorMessage,
  isError = false,
  isDisabled = false,
  value: controlledValue,
  defaultValue = null,
  onChange,
}: CalendarInputBoxProps) => {
  const [inner, setInner] = useState<Date | null>(defaultValue);
  const value = controlledValue ?? inner; 

  const handleChange = (next: Value) => {
    const picked = Array.isArray(next) ? next[0] ?? null : next;
    if (controlledValue === undefined) setInner(picked);
    onChange?.(picked);
  };

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
          h="74px"
          gap="0.25rem"
          position="relative"
        >
          <Text textStyle="caption_12800" color="text.text1" h="22px" display="flex" alignItems="center">
            {title}
          </Text>

          <Grid
            flexDirection="row"
            w="100%"
            h="24px"
            gap="10px"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Box 
              display="flex" 
              alignItems="center" 
              w="20px" 
              h="20px"
              >
              <ChakraIcons.CalendarSolid color="icon.icon3" />
            </Box>
          </Grid>

          <Box
            w="100%"
            position="absolute"
            left="1rem"
            top="38px"
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
          >
            <DatePicker
              value={value as Value}        
              onChange={handleChange}      
              format="y.MM.dd"
              maxDetail="month"
              dayPlaceholder="00"
              monthPlaceholder="00"
              yearPlaceholder="0000"
              calendarIcon={null}
              clearIcon={null}
              disabled={isDisabled}
              locale="ko-KR"
              showLeadingZeros
            />
          </Box>
        </Box>
      </Box>

      {isError ? (
        <Field.ErrorText
          aria-live="assertive"
          textStyle="caption_12400"
          mt="2px"
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
            mt="2px"
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
