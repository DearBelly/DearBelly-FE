import React, { useState, forwardRef } from "react";
import { Box, Text, Input, InputGroup } from "@chakra-ui/react";
import { ChakraIcons } from "@/utils/withChakraIcon";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export interface InputBoxCalendarProps {
  mode: "default" | "transparent";
  title: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (date: Date | null) => void;
}

export const InputBoxCalendar = ({
  mode,
  title,
  placeholder = "YYYY-MM-DD",
  disabled = false,
  onChange,
}: InputBoxCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const CustomInput = forwardRef<HTMLInputElement, any>(
    ({ value, onClick, placeholder }, ref) => (
      <Input
        ref={ref}
        onClick={(e) => { onClick?.(e); setOpen(true); }}
        value={value}
        placeholder={placeholder}
        variant="outline"
        textStyle="body_14400224"
        css={{ "--input-border-width": "0px" }}
        border="0"
        boxShadow="none"
        px="0"
        py="0"
        h="24px"
        style={{ width: "100%" }}
        lineHeight="24px"
        readOnly
        _placeholder={{ color: "text.text4" }}
        _focusVisible={{
          boxShadow: "none",
          borderColor: "transparent",
          outline: "none",
        }}
        _hover={{ borderColor: "transparent" }}
        disabled={disabled}
      />
    )
  );
  CustomInput.displayName = "CustomInput";

  return (
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
        <Box position="relative" zIndex={2000}>
          <InputGroup
            w="100%"
            endElement={
              <ChakraIcons.CalendarSolid
                color="icon.icon3"
                style={{ cursor: "pointer" }}
                onClick={() => setOpen((prev) => !prev)}
              />
            }
          >
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setOpen(false);
                onChange?.(date ?? null); 
              }}
              dateFormat="yyyy-MM-dd"
              open={open}
              onClickOutside={() => setOpen(false)}
              popperClassName="datepicker-popper"
              customInput={
                <CustomInput
                  placeholder={placeholder}
                  value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                />
              }
            />
          </InputGroup>
        </Box>
      </Box>
    </Box>
  );
};
