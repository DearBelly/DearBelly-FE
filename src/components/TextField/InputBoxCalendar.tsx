"use client";

import React, { useRef, useState } from "react";
import { Box, Input, Text } from "@chakra-ui/react";
import { CalendarSolid } from "@mynaui/icons-react";
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
  placeholder = "텍스트를 입력해 주세요",
  disabled = false,
}: InputBoxCalendarProps) => {
  // 데이트 피커를 사용하여 캘린더 구현하기 위한 상태관리 
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [open, setOpen] = useState(false); 

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

        <Box display="flex" alignItems="center" gap="10px" mt="0.25rem" position="relative">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setOpen(false); // 날짜 선택하면 닫기
            }}
            dateFormat="yyyy-MM-dd"
            open={open} // 상태에 따라 열림/닫힘 제어
            onClickOutside={() => setOpen(false)} // 바깥 클릭 시 닫힘
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
                value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
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
                readOnly
              />
            }
          />
          <Box ml="auto">
            <CalendarSolid
              color="var(--Icon-3, #949393)"
              style={{ cursor: "pointer" }}
              onClick={() => setOpen((prev) => !prev)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
