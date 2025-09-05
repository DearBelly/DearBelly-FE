'use client';

import React, {type ReactNode, useEffect, useState } from 'react'
import { Box } from "@chakra-ui/react";
import { MobileLayout } from "../../components/Layouts/MobileLayout";
import { ChevronRight } from "@mynaui/icons-react";
import { useRouter } from 'next/navigation';
import { ProfileContent } from '@/components/ProfileContent/ProfileContent';
import { useTheme } from "next-themes"; 

export default function Mypage () {
    const router = useRouter();

    // 라이트 모드, 다크 모드 판별 
    const { theme, setTheme } = useTheme();
    const handleThemeToggle = (on: boolean) => {
        setTheme(on ? "light" : "dark");
    };

    return (
        <MobileLayout>
            <Box className='allContainer'>
                <Box className='profileHeaderContainer' mt='1rem'>
                    <img src='/images/profile.svg'/>
                    <Box className='UserNameBox' display='flex' alignItems='center' gap='0.62rem' mt='0.69rem' onClick={() => router.push('mypage/profileChange_p')} style={{cursor: 'pointer'}}>
                        <UserName>가나다라마바</UserName>
                        <ChevronRight cursor='pointer'/>
                    </Box>
                </Box>

                <Box className='familyContainer' width='100%' padding='0.63rem 0.5rem' background='bg.bg3' borderRadius='0.75rem' mt='1.88rem'>
                    <ContentName>가족</ContentName>
                    <ProfileContent content='가족 코드' onClick={() => router.push('mypage/familyCodeEdit')}/>
                    <ProfileContent content='가족 정보' onClick={() => router.push('mypage/familyInventory')}/>
                    <ProfileContent content='태아 정보' onClick={() => router.push('mypage/babyInfo')}/>
                </Box>

                <Box className='InfoContainer' width='100%' padding='0.63rem 0.5rem' background='bg.bg3' borderRadius='0.75rem' mt='1.25rem'>
                    <ContentName>정보</ContentName>
                    <ProfileContent content='카테고리 수정' onClick={() => router.push('mypage/categoryEdit')}/>
                    <ProfileContent content='북마크 모음' onClick={() => router.push('mypage/bookMark')}/>
                </Box>

                {/* 라이트, 다크 설정 토글 버튼 */}
                <Box className='ThemeContainer' width='100%' padding='0.63rem 0.5rem' background='bg.bg3' borderRadius='0.75rem' mt='1.25rem'>
                    <ContentName>테마</ContentName>
                    <ProfileContent
                        content='라이트 모드'
                        showToggle
                        onToggleChange={handleThemeToggle}
                        toggleDefault={theme === "light"}
                    />
                </Box>

                <Box className='PersonalInfoContainer' width='100%' padding='0.63rem 0.5rem' background='bg.bg3' borderRadius='0.75rem' mt='1.25rem' mb='2.31rem'>
                    <ContentName>개인 정보</ContentName>
                    <ProfileContent content='개인 정보 확인' onClick={() => router.push('mypage/personalInfo')}/>
                    <ProfileContent content='개인 정보 수집 동의' onClick={() => router.push('mypage/personalInfoAgree')}/>
                </Box>
            </Box>
        </MobileLayout>
    ) 
}

export const UserName = ({ children }: { children: ReactNode }) => (
    <Box
      display="inline-block"
      color="text.text1"
      textStyle="Head_188001"
    >
      {children}
    </Box>
);

export const ContentName = ({ children }: { children: ReactNode }) => (
    <Box
      display="inline-block"
      color="text.text1"
      textStyle="body_148001"
      marginBottom="0.75rem"
      paddingLeft="0.5rem"
    >
      {children}
    </Box>
);