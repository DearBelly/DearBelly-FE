'use client';

import React, {type ReactNode, useEffect, useState } from 'react'
import { Box, Image } from "@chakra-ui/react";
import { MobileLayout } from "../../components/Layouts/MobileLayout";
import { ChakraIcons } from "@/utils/withChakraIcon";
import { useRouter } from 'next/navigation';
import { ProfileContent } from '@/components/ProfileContent/ProfileContent';
import { useTheme } from "next-themes"; 

const profileImage = '/images/profile.svg';

export default function Mypage () {
    const router = useRouter();

    // 백엔드 데이터들 저장 용도 
    const [data, setData] = useState<any|null>(null);

    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0Iiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTc1NzAzMjg4NSwiZXhwIjoxNzU5NjI0ODg1fQ.WurUNoDw9iUX7wx09_4cMzy91fVtL22gnpxvMw-V-Aw");
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member/profile`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
        })
          .then(response => response.json())
          .then(data => {
            console.log("백엔드 응답 JSON:", data);
            setData(data.data);

            // 닉네임 저장
            if (data?.data?.nickname) {
                localStorage.setItem('nickname', data.data.nickname);
            }
          })
          .catch((error) => {
            console.error('내정보 조회 실패:', error);
          })
    }, []); 

    // 라이트 모드, 다크 모드 판별 
    const { theme, setTheme } = useTheme();
    const handleThemeToggle = (on: boolean) => {
        setTheme(on ? "light" : "dark");
    };

    return (
        <MobileLayout>
            <Box className='allContainer' display='flex' alignItems='center' justifyContent='center'>
                <Box className='contentContainer' w="100%" maxW="33.75rem" mx="auto" >
                    <Box className='profileHeaderContainer' mt='1rem'>
                        <Box
                            position="relative"
                            w="5rem"
                            h="5rem"
                            maxW="100%"
                            overflow="hidden"
                            flexShrink={0}
                            borderRadius="50%"
                        >
                            <Image
                            src={data?.imgUrl || profileImage}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            />
                        </Box>
                        <Box className='userNameBox' display='flex' alignItems='center' gap='0.62rem' mt='0.69rem' onClick={() => router.push('my-page/profile-change-maternity')} style={{cursor: 'pointer'}}>
                            <UserName>{data?.nickname || "알 수 없음"}</UserName>
                            <ChakraIcons.ChevronRight cursor='pointer'color='icon.icon1'/>
                        </Box>
                    </Box>

                    <Box className='familyContainer' width='100%' padding='0.63rem 0.5rem' background='bg.bg3' borderRadius='0.75rem' mt='1.88rem'>
                        <ContentName>가족</ContentName>
                        <ProfileContent content='가족 코드' onClick={() => router.push('my-page/family-code-edit')}/>
                        <ProfileContent content='가족 정보' onClick={() => router.push('my-page/family-inventory')}/>
                        <ProfileContent content='태아 정보' onClick={() => router.push('my-page/baby-info')}/>
                    </Box>

                    <Box className='InfoContainer' width='100%' padding='0.63rem 0.5rem' background='bg.bg3' borderRadius='0.75rem' mt='1.25rem'>
                        <ContentName>정보</ContentName>
                        <ProfileContent content='카테고리 수정' onClick={() => router.push('my-page/category-edit')}/>
                        <ProfileContent content='북마크 모음' onClick={() => router.push('my-page/book-mark')}/>
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
                        <ProfileContent content='개인 정보 확인' onClick={() => router.push('my-page/personal-info')}/>
                        <ProfileContent content='개인 정보 수집 동의' onClick={() => router.push('my-page/personal-info-agree')}/>
                    </Box>
                </Box>
            </Box>
        </MobileLayout>
    ) 
}

const UserName = ({ children }: { children: ReactNode }) => (
    <Box
      display="inline-block"
      color="text.text1"
      textStyle="head_188001"
    >
      {children}
    </Box>
);

const ContentName = ({ children }: { children: ReactNode }) => (
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