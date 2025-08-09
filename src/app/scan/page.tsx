"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { useGetBreakPointValue } from "@/context/BreakPointProvider";
import { MobileLayout } from "@/components/Layouts/MobileLayout";
import { ImageSelectButton } from "@/components/ComputerVision/SelectBtn/ImageSelectButton";
import { CameraSolid } from "@mynaui/icons-react";
import { ImageSolid } from "@mynaui/icons-react";

export default function Scan() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const router = useRouter();
  const handleCameraClick = () => {
    router.push('/scan/camera');
  };
  const handleGalleryClick = () => {
    router.push('/scan/gallery');
  };

  const content = (
    <Box display="flex" flexDirection="column" alignItems="center" minH="60vh">
      <ImageSelectButton icon={<CameraSolid width="4rem" height="4rem" />} text="카메라로 촬영하기" onClick={handleCameraClick} />
      <Box mt="1.25rem">
        <ImageSelectButton icon={<ImageSolid width="4rem" height="4rem" />} text="갤러리에서 선택하기" onClick={handleGalleryClick}/>
      </Box>
    </Box>
  );

  return isMobile ? (
    <MobileLayout topBarProps={{
      mode: 'logo',
      backgroundType: 'filled',
    }}>
      {content}
    </MobileLayout>
  ) : (
    "웹용"
  );
}
