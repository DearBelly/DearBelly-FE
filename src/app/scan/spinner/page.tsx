'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { PhotoGuideModal } from '../../../components/ComputerVision/Photo/PhotoGuideModal';
import { useRouter } from 'next/navigation';
import { ChakraIcons } from "@/utils/withChakraIcon";

export default function Spinner() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/scan');
  };

  return (
    <Box bg="toast.toastBg" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box 
        position='fixed'
        top='1.25rem'
        right='1.25rem' 
        zIndex='1000'
        display='flex'
        cursor='pointer'
      > 
        <ChakraIcons.X size='1.5rem' color='white' strokeWidth={1.5} onClick={handleBackClick}/> 
      </Box>
      <PhotoGuideModal
        accept="image/*"
        initialImage="/images/computerVision/spinner.svg" 
        title="의약품 성분 분석중"     
        content={
          <>
            현재 의약품 성분 분석중입니다<br/>
            잠시만 기다려주세요
          </>
        }
      />
    </Box>
  );
}
