'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { useGetBreakPointValue } from '../../../context/BreakPointProvider';
import { PhotoGuideModal } from '../../../components/ComputerVision/Photo/PhotoGuideModal';
import { PhotoBtn } from '../../../components/ComputerVision/Photo/PhotoBtn';
import { useRouter } from 'next/navigation';
import { X } from "@mynaui/icons-react";

export default function Gallery() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/scan');
  };

  const handleImageUpload = (file: File) => {
    console.log('촬영된 이미지:', file);
  };

  const handleCrop = (dataUrl: string | null) => {
    if (!dataUrl) {
      alert('이미지를 먼저 업로드하고, 가이드 안에 맞춰주세요.');
      return;
    }
    // 결과 페이지에서 읽어 쓰게 임시 저장 (원하면 recoil/zustand/서버 업로드로 교체)
    sessionStorage.setItem('scanCrop', dataUrl);
    router.push('/scan/result');
  };

  const content = (
    <Box bg="#737373" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box 
        position='fixed'
        top='1.25rem'
        right='1.25rem' 
        zIndex='1000'
        display='flex'
        cursor='pointer'
      > 
        <X size='1.5rem' color='white' strokeWidth={1.5} onClick={handleBackClick}/> 
      </Box>
      <PhotoGuideModal
        source="gallery"
        accept="image/*"
        onImageUpload={handleImageUpload}
        onCrop={handleCrop}
        initialImage="/images/med.svg" 
        title="의약품 촬영 가이드"     
        content={
          <>
            단일 알약만 인식됩니다<br/>
            가이드라인 안에 알약 하나만 맞춰주세요
          </>
        }
      >
        <PhotoBtn variant="large" data-role="take">앨범에서 업로드하기</PhotoBtn>
        <PhotoBtn variant="assistive" data-role="retake">다시 업로드하기</PhotoBtn>
        <PhotoBtn variant="primary" data-role="confirm">결과보기</PhotoBtn>
      </PhotoGuideModal>
    </Box>
  );

  return isMobile ? (
      content
  ) : (
    content
  );
}