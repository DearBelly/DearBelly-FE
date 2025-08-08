import React from 'react';
import { CheckSquareSolid } from "@mynaui/icons-react";
import { Box, Text } from '@chakra-ui/react';

interface CheckFieldProps {
  label: string;
  onClick?: () => void;
  checked?: boolean;
}

export const CheckField = ({ label, onClick, checked = false }: CheckFieldProps) => {
  const iconColor = checked ? "#FF6257" : "#D0D0D0"; 

  return (
    <Box
      onClick={onClick}
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="flex-start" 
      gap="10px"
      userSelect="none"
      cursor="pointer"
    >
      <Box mt="2px">
        <CheckSquareSolid width="20px" height="20px" color={iconColor} />
      </Box>
      <Text fontSize="14px" color="#000" fontFamily="NanumSquare Neo" fontWeight="400" lineHeight="24px" letterSpacing="-0.28px">
        {label}
      </Text>
    </Box>
  );
};
