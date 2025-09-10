'use client';

import { useState, useEffect } from "react";
import { Box } from '@chakra-ui/react';
import { PhotoGuideModal } from '../../../components/ComputerVision/Photo/PhotoGuideModal';
import { PhotoBtn } from '../../../components/ComputerVision/Photo/PhotoBtn';
import { useRouter } from 'next/navigation';
import { ChakraIcons } from "@/utils/withChakraIcon";
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function Camera() {
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

    // 이미지 업로드 함수
    const handleImageUpload = (file: File) => {
      console.log('촬영된 이미지:', file);
    };

    // 크롭 함수
    const handleCrop = (dataUrl: string | null) => {
      if (!dataUrl) {
        alert('이미지를 먼저 업로드하고, 가이드 안에 맞춰주세요.');
        return;
      }
      // 결과 페이지에서 읽어 쓰게 임시 저장 (원하면 recoil/zustand/서버 업로드로 교체)
      sessionStorage.setItem('scanCrop', dataUrl);
      router.push('/scan/spinner');
    };

    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);

    // 토큰 체크
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);
  }, []);

  return (
    !isLogin ? (
      <LoginModal />
    ) : (
      <Box bg="toast.toastBg" minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box
          position='fixed'
          top='1.25rem'
          right='1.25rem'
          zIndex='1000'
          display='flex'
          cursor='pointer'
        >
          <ChakraIcons.X size='1.5rem' color='white' strokeWidth={1.5} onClick={handleBackClick} />
        </Box>

        <PhotoGuideModal
          source="camera" // 모바일이면 후면 카메라 우선
          accept="image/*"
          onImageUpload={handleImageUpload}
          onCrop={handleCrop}
          initialImage={isLight ? "/images/computerVision/camera_light.png" : "/images/computerVision/camera_dark.png"}
          title="의약품 촬영 가이드"
          content={
            <>
              단일 알약만 인식됩니다<br />
              알약 표면의 글자가 또렷하게 보이도록<br />
              가이드라인 안에 알약 하나만 맞춰주세요<br />
            </>
          }
        >
          {/* 선택된 이미지가 없을 때 아래의 버튼만 보임 */}
          <PhotoBtn variant="large" data-role="take">
            사진찍기
          </PhotoBtn>

          {/* 선택된 이미지가 있을 때 아래의 버튼만 보임 */}
          <PhotoBtn variant="assistive" data-role="retake">
            다시찍기
          </PhotoBtn>
          <PhotoBtn variant="primary" data-role="confirm">
            결과보기
          </PhotoBtn>
        </PhotoGuideModal>
      </Box>
    )
  );
}