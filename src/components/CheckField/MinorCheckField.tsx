'use client';

import { CheckSquareSolid } from "@mynaui/icons-react";
import { Box, Text, useToken } from '@chakra-ui/react';

interface MinorCheckFieldProps {
  label: string;
  onClick?: () => void;
  checked?: boolean;
}

export const MinorCheckField = ({ label, onClick, checked = false }: MinorCheckFieldProps) => {
  const [primary, gray] = useToken("colors", ["icon.iconPrimary", "icon.icon4"])
  const iconColor = checked ? primary : gray; 

  return (
    <Box
      onClick={onClick}
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center" 
      gap="8px"
      userSelect="none"
      cursor="pointer"
    >
      <CheckSquareSolid width="20px" height="20px" color={iconColor} />
      <Text textStyle="caption_12400">
        {label}
      </Text>
    </Box>
  );
};
