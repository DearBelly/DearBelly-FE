import React from 'react'
import { Box, Text } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../../context/BreakPointProvider";
import { PhotoGuideModal } from "../../components/ComputerVision/Photo/PhotoGuideModal";
import { PhotoBtn } from "../../components/ComputerVision/Photo/PhotoBtn";
import { useRouter } from "next/router";

export default function Gallery() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const router = useRouter();
  const handleResultClick = () => {
    router.push('/ComputerVision/Result');
  };

  const content = (
    <Box bg="#737373" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <PhotoGuideModal>
        <PhotoBtn variant="large" onClick={handleResultClick}>확인</PhotoBtn>
      </PhotoGuideModal>
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