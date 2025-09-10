'use client';

import React from 'react'
import { useRouter } from 'next/navigation';
import { Box } from "@chakra-ui/react";
import { MobileLayout } from "../../components/Layouts/MobileLayout";
import { ImageSelectButton } from "../../components/ComputerVision/SelectBtn/ImageSelectButton";
import { ChakraIcons } from "@/utils/withChakraIcon";

export default function Scan() {
  const router = useRouter();
  const handleCameraClick = () => {
    router.push('/scan/camera');
  };
  const handleGalleryClick = () => {
    router.push('/scan/gallery');
  };

  return (
    <MobileLayout>
      <Box display="flex" flexDirection="column" alignItems="center" minH="60vh" mt='3.008vh' width="100%" maxW="35rem" mx="auto">
        <ImageSelectButton icon={<ChakraIcons.CameraSolid width="3rem" height="3rem" color='icon.icon1'/>} text="카메라로 촬영하기" onClick={handleCameraClick} />
        <ImageSelectButton icon={<ChakraIcons.ImageSolid width="3rem" height="3rem" color='icon.icon1'/>} text="갤러리에서 선택하기" onClick={handleGalleryClick} />
      </Box>
    </MobileLayout>
  ) 
}