import React from 'react'
import { Box, Text } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../../context/BreakPointProvider";
import { MobileLayout } from "../../components/Layouts/MobileLayout";

export default function Camera() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const content = (
    <Box>
    </Box>
  );

  return isMobile ? (
    <MobileLayout>
      {content}
    </MobileLayout>
  ) : (
    content
  );
}