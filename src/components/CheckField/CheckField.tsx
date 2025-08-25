import React from 'react';
import { CheckSquareSolid } from "@mynaui/icons-react";
import { Box, Text, useToken } from '@chakra-ui/react';

interface CheckFieldProps {
  label: string;
  onClick?: () => void;
  checked?: boolean;
}

export const CheckField = ({ label, onClick, checked = false }: CheckFieldProps) => {
  // 적용이 안 되길래 임시적으로 바꿈 (나중에 필요하면 주석 없애서 사용)
  // const [primary, gray] = useToken("colors", ["iconPrimary", "icon.icon.4"])
  // const iconColor = checked ? primary : gray; 

   // checked 상태에 따라 색상 지정
   const iconColor = checked ? 'var(--Icon-primary, #FF6257)' : 'var(--Icon-4, #D0D0D0)';

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
