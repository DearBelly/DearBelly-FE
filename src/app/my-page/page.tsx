'use client';

import React, { type ReactNode, useEffect, useState } from 'react';
import { Box, Image } from "@chakra-ui/react";
import { MobileLayout } from "../../components/Layouts/MobileLayout";
import { ChakraIcons } from "@/utils/withChakraIcon";
import { useRouter } from 'next/navigation';
import { ProfileContent } from '@/components/ProfileContent/ProfileContent';
import { useTheme } from "next-themes"; 
import { useUserStore } from '@/store/useUserStore';
import { LoginModal } from '@/components/LoginModal/LoginModal'; 

const DEFAULT_PROFILE_IMAGE = "/images/icon_default_profile.svg";

export default function Mypage() {
  const router = useRouter();
  const { username, profileImg, isPregnant, setUser } = useUserStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_TEMP_TOKEN;

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member/profile`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data?.data) {
            setUser({
              username: data.data.nickname,
              userEmail: data.data.email,
              profileImg: data.data.imgUrl,
              isPregnant: data.data.isPregnant,
              impDate: data.data.lmpDate,
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
  const handleThemeToggle = (on: boolean) => setTheme(on ? "light" : "dark");

  const handleNavigation = (path: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoginOpen(true);
      return;
    }
    router.push(path);
  };

  return (
    <MobileLayout>
      <Box className='allContainer' display='flex' alignItems='center' justifyContent='center'>
        <Box className='contentContainer' w="100%" maxW="33.75rem" mx="auto" >
          {/* 프로필 영역 */}
          <Box className='profileHeaderContainer' mt='1rem'>
            <Box
              position="relative"
              w="5rem"
              h="5rem"
              overflow="hidden"
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
              cursor="pointer"
              onClick={() => handleNavigation(isPregnant ? 'my-page/profile-change-maternity' : 'my-page/profile-change-family')}
            >
              <UserName>{username || "비회원"}</UserName>
              <ChakraIcons.ChevronRight cursor='pointer' color='icon.icon1' />
            </Box>
          </Box>

          {/* 섹션별 버튼 */}
          <ContentSection title="가족" mt="1.88rem">
            <ProfileContent
              content='가족 코드'
              onClick={() => handleNavigation(isPregnant ? 'my-page/family-code-share' : 'my-page/family-code-edit')}
            />
            <ProfileContent content='가족 정보' onClick={() => handleNavigation('my-page/family-inventory')} />
            <ProfileContent content='태아 정보' onClick={() => handleNavigation('my-page/baby-info')} />
          </ContentSection>

          <ContentSection title="정보" mt="1.25rem">
            <ProfileContent content='카테고리 수정' onClick={() => handleNavigation('my-page/category-edit')} />
            <ProfileContent content='북마크 모음' onClick={() => handleNavigation('my-page/book-mark')} />
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
            <ProfileContent content='개인 정보 확인' onClick={() => handleNavigation('my-page/personal-info')} />
            <ProfileContent content='개인 정보 수집 동의' onClick={() => handleNavigation('my-page/personal-info-agree')} />
          </ContentSection>
        </Box>
      </Box>

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </MobileLayout>
  );
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
