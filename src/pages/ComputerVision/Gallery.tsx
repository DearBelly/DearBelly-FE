import React from 'react'
import { Box, Text } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../../context/BreakPointProvider";
import { MobileLayout } from "../../components/Layouts/MobileLayout";

export default function Gallery() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const content = (
    <Box>
      <Text>여기에 페이지 내용을 작성하세요.</Text>
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