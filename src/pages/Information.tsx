import React from 'react'
import { Box, Text } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../context/BreakPointProvider";
import { MobileLayout } from "../components/Layouts/MobileLayout";
import { Search } from "@mynaui/icons-react";
import { CogFour } from "@mynaui/icons-react";

const TopRightIcons = () => (
  <div style={{display:"flex", gap: 16}}>
    <Search />
    <CogFour />
  </div>
);

export default function Information() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const content = (
    <Box>
      <Text>여기에 페이지 내용을 작성하세요.</Text>
    </Box>
  );

  return isMobile ? (
    <MobileLayout topbarContent={<TopRightIcons/>}>
      {content}
    </MobileLayout>
  ) : (
    content
  );
}