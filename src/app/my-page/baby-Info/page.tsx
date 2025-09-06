'use client';

import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { ProfileListOutput } from '@/components/ProfileList/ProfileListOutput';
import { testData2 } from '../testData';
import { useRouter } from "next/navigation";
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function BabyInfo() {
    const router = useRouter();
    const handleClick = () => {
      router.push("/my-page/baby-edit");
    };

    const pregnantDate='2025.08.23';

    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);

    // 토큰 체크
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLogin(!!token);
    }, []);

    return (
        <TopBarBottomButtonLayout 
            nextLabel="추가하기"
            topbarTitle='태아 정보'
            nextDisabled={false}
            onNext={handleClick}
        >
            <Box className='body_wrapper' display="flex" flexDirection="column" alignItems="center" mt='0.62rem'>
                <Box w='100%' maxW='35rem' mx='auto'>
                    <Box 
                        className='text_wrapper'
                        color="text.text1"
                        textStyle="body_12700"
                        mb='1rem'                 
                        textAlign='right'
                        mr='0.5rem'
                    >
                        <Text>출산예정일 : {pregnantDate}</Text>
                    </Box>
                    <ProfileListOutput cards={testData2}/>
                </Box>
                {!isLogin && <LoginModal />}
            </Box>
        </TopBarBottomButtonLayout>
    );
}