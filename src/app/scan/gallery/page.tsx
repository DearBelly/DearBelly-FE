'use client';

import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { PhotoGuideModal } from '../../../components/ComputerVision/Photo/PhotoGuideModal';
import { PhotoBtn } from '../../../components/ComputerVision/Photo/PhotoBtn';
import { useRouter } from 'next/navigation';
import { ChakraIcons } from "@/utils/withChakraIcon";
import { LoginModal } from '@/components/LoginModal/LoginModal';

// url을 file형태로 변환
function dataURLtoFile(dataUrl: string, fileName: string): File {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, {type: mime});
}

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

  const handleCrop = async (dataUrl: string | null) => {
    if (!dataUrl) {
      alert('이미지를 먼저 업로드하고, 가이드 안에 맞춰주세요.');
      return;
    }
  
    try {
      const file = dataURLtoFile(dataUrl, "scan.png");
      const formData = new FormData();
      formData.append("file", file);
  
      const token = localStorage.getItem("token");
  
      router.push('/scan/spinner');
  
      // API 요청
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/scan`, {
        method: "POST", 
        headers: {
          Authorization: `Bearer ${token}` 
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("이미지 파일 업로드 실패");
      }
  
      const result = await response.json();
      console.log("이미지 파일 스캔 결과: ", result);
  
      // 응답 저장
      sessionStorage.setItem('scanCrop', JSON.stringify({
        ...result,
        cropImage: dataUrl,
      }));
  
      router.push('/scan/result');
    } catch (err) {
      console.error("스캔 이미지 파일 업로드 오류:", err);
      alert("업로드 중 오류가 발생했습니다.");
      router.push('/scan'); 
    }
  };

  // 로그인 여부
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  }, []);

  return(
     !isLogin ? (
    <LoginModal onClose={() => {setIsLogin(false); router.push('/scan');}} />
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
