'use client';

import React, { type ReactNode, useEffect, useState } from 'react'
import { Box, Image } from "@chakra-ui/react";
import { MobileLayout } from "../../components/Layouts/MobileLayout";
import { ChakraIcons } from "@/utils/withChakraIcon";
import { useRouter } from 'next/navigation';
import { ProfileContent } from '@/components/ProfileContent/ProfileContent';
import { useTheme } from "next-themes"; 
import { useUserStore } from '@/store/useUserStore';

const DEFAULT_PROFILE_IMAGE =
process.env.NEXT_PUBLIC_DEFAULT_IMAGE ||
"https://dearbelly-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/default-profile.png";

export default function Mypage() {
  const router = useRouter();
  const { username, profileImg, isPregnant, setUser } = useUserStore();

//   더미데이터
  // localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTc1NzE2NjA0NSwiZXhwIjoxNzU5NzU4MDQ1fQ.tsX0zfweUT91E3JllKKFk55_4rYQB1ikwqLUmeaDjdA");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if(storedToken) {
      setUser({token: storedToken});

      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member/profile`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${storedToken}`,
          "Accept": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log("백엔드 응답 JSON:", data);
  
          if (data?.data) {
            setUser({
              username: data.data.nickname,
              userEmail: data.data.email,
              profileImg: data.data.imgUrl,
              isPregnant: data.data.isPregnant,
              impDate: data.data.ImpDate,
              login: data.data.socialType,
              gender: data.data.gender,
              birth: data.data.birthDate,
            });
          }
        })
        .catch((error) => {
          console.error('내정보 조회 실패:', error);
        });
    }
  }, [setUser]);

  const { theme, setTheme } = useTheme();
  const handleThemeToggle = (on: boolean) => {
    setTheme(on ? "light" : "dark");
  };


  // 프로필 이미지 다시 상태 저장
  useEffect(() => {
    if (profileImg) {
      // 만약 blob이 들어가면 blob 인식 x
      const safeProfileImg =
        !profileImg.startsWith("blob:")
          ? encodeURI(profileImg)
          : DEFAULT_PROFILE_IMAGE;
      setUser({ profileImg: safeProfileImg });
    }
  }, [profileImg, setUser]);

  return (
    <MobileLayout>
      <Box className='allContainer' display='flex' alignItems='center' justifyContent='center'>
        <Box className='contentContainer' w="100%" maxW="33.75rem" mx="auto" >
          {/* 프로필 이미지, 닉네임 영역 */}
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
                src={profileImg || DEFAULT_PROFILE_IMAGE}
                w="100%"
                h="100%"
                objectFit="cover"
                alt="프로필 이미지"
              />
            </Box>
            <Box
              className='userNameBox'
              display='flex'
              alignItems='center'
              gap='0.62rem'
              mt='0.69rem'
              onClick={() => router.push(isPregnant ? 'my-page/profile-change-maternity' : 'my-page/profile-change-family')}
              cursor="pointer"
            >
              <UserName>{username  || "알 수 없음"}</UserName>
              <ChakraIcons.ChevronRight cursor='pointer' color='icon.icon1' />
            </Box>
          </Box>

          <ContentSection title="가족" mt="1.88rem">
            <ProfileContent
              content='가족 코드'
              onClick={() => router.push(isPregnant ? 'my-page/family-code-share' : 'my-page/family-code-edit')}
            />
            <ProfileContent content='가족 정보' onClick={() => router.push('my-page/family-inventory')} />
            <ProfileContent content='태아 정보' onClick={() => router.push('my-page/baby-info')} />
          </ContentSection>

          <ContentSection title="정보" mt="1.25rem">
            <ProfileContent content='카테고리 수정' onClick={() => router.push('my-page/category-edit')} />
            <ProfileContent content='북마크 모음' onClick={() => router.push('my-page/book-mark')} />
          </ContentSection>

          <ContentSection title="테마" mt="1.25rem">
            <ProfileContent
              content='라이트 모드'
              showToggle
              onToggleChange={handleThemeToggle}
              toggleDefault={theme === "light"}
            />
          </ContentSection>

          <ContentSection title="개인 정보" mt="1.25rem" mb="2.31rem">
            <ProfileContent content='개인 정보 확인' onClick={() => router.push('my-page/personal-info')} />
            <ProfileContent content='개인 정보 수집 동의' onClick={() => router.push('my-page/personal-info-agree')} />
          </ContentSection>
        </Box>
      </Box>
    </MobileLayout>
  )
}

const UserName = ({ children }: { children: ReactNode }) => (
  <Box display="inline-block" color="text.text1" textStyle="head_188001">
    {children}
  </Box>
);

const ContentName = ({ children }: { children: ReactNode }) => (
  <Box
    display="inline-block"
    color="text.text1"
    textStyle="body_148001"
    mb="0.75rem"
    pl="0.5rem"
  >
    {children}
  </Box>
);

const ContentSection = ({
  title,
  children,
  mt,
  mb,
}: {
  title: string;
  children: ReactNode;
  mt?: string;
  mb?: string;
}) => (
  <Box
    width='100%'
    p='0.63rem 0.5rem'
    background='bg.bg3'
    borderRadius='0.75rem'
    mt={mt}
    mb={mb}
  >
    <ContentName>{title}</ContentName>
    {children}
  </Box>
);
