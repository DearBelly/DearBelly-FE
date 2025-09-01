'use client';

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { testData_all } from '../testData';
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function BookMark() {
    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);

    // 토큰 체크
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLogin(!!token);
    }, []);

    const content_mobile = (
        <Box className='body_wrapper' display="flex" flexDirection="column" alignItems="center" mt='0.62rem' mb='0.62rem'>
            <ContendCardOutput cards={testData_all}/>
            {!isLogin  && <LoginModal />}
        </Box>
    );
    
    return (
        <MobileLayout
            topbarMode='back'
            topbarTitle='북마크 모음'
            topbarBackground='filled'
        >
            {content_mobile}
        </MobileLayout>
    )
}
