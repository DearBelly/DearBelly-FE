'use client';

import React, {type ReactNode, useEffect, useState } from 'react'
import { Box } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../../context/BreakPointProvider";
import { MobileLayout } from "../../components/Layouts/MobileLayout";
import { ChevronRight } from "@mynaui/icons-react";
import { useRouter } from 'next/navigation';
import { ProfileContent } from '@/components/ProfileContent/ProfileContent';
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function Mypage () {
    const isPc = useGetBreakPointValue();
    const isMobile = !isPc;
    const router = useRouter();

    // 더미 토큰값 넣기 
    localStorage.setItem('token', 'ㄴㅇㅁㄴㅇㅁㄴㅇ');

    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);

    // 라이트 모드, 다크 모드 판별 && 토큰 체크
    useEffect(() => {
        const lightMode_save = localStorage.getItem('lightMode');
        const isLight = lightMode_save === null ? true : lightMode_save === 'true';
        applyTheme(isLight);

        localStorage.setItem('chakra-ui-color-mode', isLight ? 'light' : 'dark');

        // 토큰 유무 확인
        const token = localStorage.getItem('token');
        setIsLogin(!!token);
    }, []);

    // 라이트냐 다크냐에 따라 테마 적용
    const applyTheme = (isLight: boolean) => {
        document.documentElement.setAttribute('data-app-theme', isLight ? 'light' : 'dark');
    };

    const content_mobile = (
        <>
        <Box className='allContainer'>
            <Box className='profileHeaderContainer' mt='1rem'>
                <img src='/images/profile.svg'/>
                <Box className='UserNameBox' display='flex' alignItems='center' gap='0.62rem' mt='0.69rem' onClick={() => router.push('mypage/profileChange_p')} style={{cursor: 'pointer'}}>
                    <UserName>가나다라마바</UserName>
                    <ChevronRight cursor='pointer'/>
                </Box>
            </Box>

            <Box className='familyContainer' width='100%' padding='0.63rem 0.5rem' background='var(--BG-BG-3, #FFF)' borderRadius='0.75rem' mt='1.88rem'>
                <ContentName>가족</ContentName>
                <ProfileContent content='가족 코드' onClick={() => router.push('mypage/familyCodeEdit')}/>
                <ProfileContent content='가족 정보' onClick={() => router.push('mypage/familyInventory')}/>
                <ProfileContent content='태아 정보' onClick={() => router.push('mypage/babyInfo')}/>
            </Box>

            <Box className='InfoContainer' width='100%' padding='0.63rem 0.5rem' background='var(--BG-BG-3, #FFF)' borderRadius='0.75rem' mt='1.25rem'>
                <ContentName>정보</ContentName>
                <ProfileContent content='카테고리 수정' onClick={() => router.push('mypage/categoryEdit')}/>
                <ProfileContent content='북마크 모음' onClick={() => router.push('mypage/bookMark')}/>
            </Box>

            {/* 라이트, 다크 설정 토글 버튼 */}
            <Box className='ThemeContainer' width='100%' padding='0.63rem 0.5rem' background='var(--BG-BG-3, #FFF)' borderRadius='0.75rem' mt='1.25rem'>
                <ContentName>테마</ContentName>
                <ProfileContent
                    content='라이트 모드'
                    showToggle
                    onToggleChange={(on) => {
                        applyTheme(on);
                        localStorage.setItem('chakra-ui-color-mode', on ? 'light' : 'dark')
                    }}
                />
            </Box>

            <Box className='PersonalInfoContainer' width='100%' padding='0.63rem 0.5rem' background='var(--BG-BG-3, #FFF)' borderRadius='0.75rem' mt='1.25rem' mb='2.31rem'>
                <ContentName>개인 정보</ContentName>
                <ProfileContent content='개인 정보 확인' onClick={() => router.push('mypage/personalInfo')}/>
                <ProfileContent content='개인 정보 수집 동의' onClick={() => router.push('mypage/personalInfoAgree')}/>
            </Box>

            {!isLogin && <LoginModal />}
        </Box>
        </>
    );

    return isMobile ? (
        <MobileLayout>
          {content_mobile}
        </MobileLayout>
    ) : (
        <MobileLayout>
          {content_mobile}
        </MobileLayout>
    );
}

export const UserName = ({ children }: { children: ReactNode }) => (
    <Box
      display="inline-block"
      color="var(--Text-Text-1, #202020)"
      fontFamily='"NanumSquare Neo"'
      fontSize="1.125rem"
      fontStyle="normal"
      fontWeight="800"
      lineHeight="1.375rem" 
      letterSpacing="-0.01125rem"
    >
      {children}
    </Box>
);

export const ContentName = ({ children }: { children: ReactNode }) => (
    <Box
      display="inline-block"
      color="var(--Text-Text-1, #202020)"
      fontFamily='"NanumSquare Neo"'
      fontSize="0.875rem"
      fontStyle="normal"
      fontWeight="800"
      lineHeight="1.25rem" 
      letterSpacing="-0.00875rem"
      marginBottom="0.75rem"
      paddingLeft="0.5rem"
    >
      {children}
    </Box>
);