"use client"
import React from 'react'
import { Box } from "@chakra-ui/react";
import { useGetBreakPointValue } from "@/context/BreakPointProvider";
import { PhotoGuideModal } from "@/components/ComputerVision/Photo/PhotoGuideModal";
import { PhotoBtn } from "@/components/ComputerVision/Photo/PhotoBtn";

export default function Camera() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const content = (
    <Box bg="#737373" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <PhotoGuideModal>
        <PhotoBtn variant="large">확인</PhotoBtn>
      </PhotoGuideModal>
    </Box>
  );

  return isMobile ? (
      content
  ) : (
    content
  );
}