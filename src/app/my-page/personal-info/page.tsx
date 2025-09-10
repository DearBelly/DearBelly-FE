'use client';

import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { ProfilePersonalContent } from '@/components/ProfilePersonalContent/ProfilePersonalContent';
import { useRouter } from "next/navigation";
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function PersonalInfo() {
    const router = useRouter();
    const handleClick = () => {
      router.push(`/login`);
    };

    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);

    // 토큰 체크
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);
  }, []);

  return (
    <MobileLayout
      topbarMode="back"
      topbarTitle="개인 정보 확인"
      topbarBackground="filled"
    >
      <Box 
        className="contentWrapper"
        width="100%"
        maxW="35rem"
        mx="auto"
      >
        {/* 개인정보 */}
        <Box
          className="personal_wrapper"
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin="1.25rem 0"
          backgroundColor="bg.bg3"
          borderRadius="0.75rem"
          padding="0.62rem 1rem"
        >
          <ProfilePersonalContent title="이름" content="김서진" />
          <ProfilePersonalContent title="로그인 방식" content="네이버 로그인" />
          <ProfilePersonalContent title="이메일 정보" content="leolove1234@naver.com" />
          <ProfilePersonalContent title="생년월일" content="1999.02.07" />
          <ProfilePersonalContent title="성별" content="남성" />
        </Box>

        {/* 로그아웃, 계정 탈퇴 */}
        <Box
          className="logout_wrapper"
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="1.25rem"
          backgroundColor="bg.bg3"
          borderRadius="0.75rem"
          padding="1rem 1rem"
          gap='1rem'
        >
          <LogoutText onClick={handleClick}>로그아웃</LogoutText>
          <LogoutText>계정 탈퇴</LogoutText>
        </Box>
      </Box>
      {!isLogin && <LoginModal />}
    </MobileLayout>
  );
}

const LogoutText = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void; }) => (
    <Box cursor="pointer" width="100%" onClick={onClick}>
      <Text
        overflow="hidden"
        color="text.text1"
        textStyle="body_1440024"
        mr="auto"          
        textAlign="left"  
      >
        {children}
      </Text>
    </Box>
  );