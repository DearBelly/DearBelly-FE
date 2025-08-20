import React from 'react';
import { CheckSquareSolid } from "@mynaui/icons-react";
import { Box, Text, useToken } from '@chakra-ui/react';

interface CheckFieldProps {
  label: string;
  onClick?: () => void;
  checked?: boolean;
}

export const CheckField = ({ label, onClick, checked = false }: CheckFieldProps) => {
  const [primary, gray] = useToken("colors", ["iconPrimary", "icon.icon.4"])
  const iconColor = checked ? primary : gray; 

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
      <Text textStyle="body_14700124">
        {label}
      </Text>
    </Box>
  );
};
