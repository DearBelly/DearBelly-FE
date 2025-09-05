'use client';

import React, {useEffect} from 'react';
import { Box } from '@chakra-ui/react';
import { PhotoGuideModal } from '../../../components/ComputerVision/Photo/PhotoGuideModal';
import { useRouter } from 'next/navigation';
import { X } from "@mynaui/icons-react";

export default function Spinner() {
    const router = useRouter();

    const handleBackClick = () => {
        router.push('/scan');
    };

    useEffect(() => {
      const timer = setTimeout(() => {
        router.push('/scan/result');
      }, 5000);

      return() => clearTimeout(timer);
    },[router]);

    return (
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