"use client";

import React, { useState } from "react";
import { RadioField } from "./RadioField";
import { Box, Input, Text } from "@chakra-ui/react";

export interface RadioBoxProps {
  mode: "default" | "transparent";
  title: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioBox = ({
  mode,
  title,
  value,
  onChange,
}: RadioBoxProps) => {
  const [isChecked, setIsChecked] = useState(false);

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

        <Box display="flex" alignItems="center" gap="10px" mt="0.25rem">
          <RadioField
            label={title}
            name="radio"
            value={value}
            checked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
          />
        </Box>
      </Box>
    </Box>
  );
};
