"use client";

import React, { useRef, useState } from "react";
import { Box, Input, Text } from "@chakra-ui/react";
import { ChakraIcons } from "@/utils/withChakraIcon";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface InputBoxCalendarProps {
  mode: "default" | "transparent";
  title: string;
  placeholder?: string;
  disabled?: boolean;
}

export const InputBoxCalendar = ({
  mode,
  title,
  placeholder,
  disabled = false,
}: InputBoxCalendarProps) => {
  // 데이트 피커를 사용하여 캘린더 구현하기 위한 상태관리 
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [open, setOpen] = useState(false); 
  const [inputValue, setInputValue] = useState("");

  const validateDate = (value: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(value);
  };

  return (
    <Box display="flex" flexDirection="column" w="100%">
      <Box
        borderRadius="1rem"
        bg={mode === "default" ? "bg.bg3" : "transparent"}
        px="1rem"
        py="0.75rem"
        gap="0.25rem"
      >
        <Text textStyle="caption_12800">{title}</Text>

        {/* Input + 아이콘 */}
        <Box display="flex" alignItems="center" gap="10px" mt="0.25rem" position="relative">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              if (date) {
                setSelectedDate(date);
                const formatted = format(date, "yyyy-MM-dd");
                setInputValue(formatted);
              }
              setOpen(false);
            }}
            dateFormat="yyyy-MM-dd"
            open={open}
            onClickOutside={() => setOpen(false)}
            customInput={
              <Input
                variant="outline"
                textStyle="body_14400224"
                css={{ "--input-border-width": "0px" }}
                border="0"
                boxShadow="none"
                px="0"
                bg="transparent"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setInputValue(value);
                }}
                _placeholder={{ color: "text.text4" }}
                _focusVisible={{
                  boxShadow: "none",
                  borderColor: "transparent",
                  outline: "none",
                  "--input-border-width": "0px",
                }}
                _hover={{ borderColor: "transparent", "--input-border-width": "0px" }}
                _invalid={{ color: "text.error" }}
                disabled={disabled}
              />
            }
          />

          <Box ml="auto">
            <ChakraIcons.CalendarSolid
              color="icon.icon3"
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(true)}
            />
          </Box>
        </Box>

        {isError && (
          <Text mt="0.5rem" color="red.500" fontSize="0.75rem" fontWeight="600">
            날짜 양식이 틀렸습니다.
          </Text>
        )}
      </Box>
    </Box>
  );
};
