import React from 'react'
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../../context/BreakPointProvider";
import { MobileLayout } from "../../components/Layouts/MobileLayout";
import { ImageSelectButton } from "../../components/ComputerVision/SelectBtn/ImageSelectButton";
import { CameraSolid } from "@mynaui/icons-react";
import { ImageSolid } from "@mynaui/icons-react";

export default function Scan() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const router = useRouter();
  const handleCameraClick = () => {
    router.push('/ComputerVision/Camera');
  };
  const handleGalleryClick = () => {
    router.push('/ComputerVision/Gallery');
  };

  const content = (
    <Box display="flex" flexDirection="column" alignItems="center" minH="60vh" mt='3.008vh'>
      <ImageSelectButton icon={<CameraSolid width="3rem" height="3rem" />} text="카메라로 촬영하기" onClick={handleCameraClick} />
      <ImageSelectButton icon={<ImageSolid width="3rem" height="3rem" />} text="갤러리에서 선택하기" onClick={handleGalleryClick} />
    </Box>
  );

  return isMobile ? (
    <MobileLayout>
      {content}
    </MobileLayout>
  ) : (
    <MobileLayout>
      {content}
    </MobileLayout>
  );
}
