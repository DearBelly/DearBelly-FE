'use client';

import React from 'react'
import { Box, Text } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { ProfileListOutput } from '@/components/ProfileList/ProfileListOutput';
import { testData2 } from '../testData';
import { useRouter } from "next/navigation";

export default function BabyInfo() {
    const router = useRouter();
    const handleClick = () => {
      router.push(`/mypage/babyEdit`);
    };

    const pregnantDate='2025.08.23';

    return (
        <TopBarBottomButtonLayout 
            nextLabel="추가하기"
            topbarTitle='태아 정보'
            nextDisabled={false}
            onNext={handleClick}
        >
            <Box className='body_wrapper' display="flex" flexDirection="column" alignItems="center" mt='0.62rem'>
                <Box>
                    <Box 
                        className='text_wrapper'
                        color="#000"
                        fontFamily="NanumSquare Neo"
                        fontSize="0.75rem"
                        fontWeight="700"
                        lineHeight="0.75rem"
                        mb='1rem'                 
                        textAlign='right'
                        mr='0.5rem'
                    >
                    <Text>출산예정일 : {pregnantDate}</Text>
                    </Box>
                    <ProfileListOutput cards={testData2}/>
                </Box>
            </Box>
        </TopBarBottomButtonLayout>
    );
}