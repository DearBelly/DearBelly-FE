import React from 'react'
import { Box } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../../context/BreakPointProvider";
import { PhotoGuideModal } from "../../components/ComputerVision/Photo/PhotoGuideModal";
import { PhotoBtn } from "../../components/ComputerVision/Photo/PhotoBtn";
import { useRouter } from "next/router";

export default function Camera() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const router = useRouter();
  const handleResultClick = () => {
    router.push('/ComputerVision/Result');
  };


  const handleImageUpload = (file: File) => {
    console.log('촬영된 이미지:', file);
    alert(`이미지가 업로드되었습니다: ${file.name}`);
  };

  const content = (
    <Box bg="#737373" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <PhotoGuideModal 
        onImageUpload={handleImageUpload}
      >
        <PhotoBtn variant="assistive">다시찍기</PhotoBtn>
        <PhotoBtn variant="primary" onClick={handleResultClick}>결과보기</PhotoBtn>
      </PhotoGuideModal>
    </Box>
  );

  return isMobile ? (
      content
  ) : (
    "hi"
  );
}