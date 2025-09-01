'use client';

import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { PhotoGuideModal } from '../../../components/ComputerVision/Photo/PhotoGuideModal';
import { PhotoBtn } from '../../../components/ComputerVision/Photo/PhotoBtn';
import { useRouter } from 'next/navigation';
import { X } from "@mynaui/icons-react";
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function Gallery() {
  const router = useRouter();

  // 라이트 모드인지, 다크 모드인지 판별
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    const lightMode_save = localStorage.getItem('lightMode');
    const mode = lightMode_save === null ? true : lightMode_save === 'true';
    setIsLight(mode);
  }, []);

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
    sessionStorage.setItem('scanCrop', dataUrl);
    router.push('/scan/spinner');
  };

  // 로그인 여부
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  }, []);

  return(
     !isLogin ? (
    <LoginModal />
    ) : (
      <Box bg="#737373" minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box
          position='fixed'
          top='1.25rem'
          right='1.25rem'
          zIndex='1000'
          display='flex'
          cursor='pointer'
        >
          <X size='1.5rem' color='white' strokeWidth={1.5} onClick={handleBackClick} />
        </Box>
        <PhotoGuideModal
          source="gallery"
          accept="image/*"
          onImageUpload={handleImageUpload}
          onCrop={handleCrop}
          initialImage={isLight ? "/images/computerVision/camera_light.png" : "/images/computerVision/camera_dark.png"}
          title="의약품 촬영 가이드"
          content={
            <>
              단일 알약만 인식됩니다<br />
              가이드라인 안에 알약 하나만 맞춰주세요
            </>
          }
        >
          <PhotoBtn variant="large" data-role="take">앨범에서 업로드하기</PhotoBtn>
          <PhotoBtn variant="assistive" data-role="retake">다시 업로드하기</PhotoBtn>
          <PhotoBtn variant="primary" data-role="confirm">결과보기</PhotoBtn>
        </PhotoGuideModal>
      </Box>
    )
  )

}
