'use client';

import { Box, Text } from "@chakra-ui/react";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { ProfilePersonalContent } from '@/components/ProfilePersonalContent/ProfilePersonalContent';
import { useRouter } from "next/navigation";
import { useUserStore } from '@/store/useUserStore';

// 성별 이름 변경
const genderMap: Record<string, string> = {
  FEMALE: '여성',
  MALE: '남성',
};

// 로그인 방식0 이름 변경
const loginMap: Record<string, string> = {
  KAKAO: '카카오 로그인',
  GOOGLE: '구글 로그인',
  NAVER: '네이버 로그인',
};

export default function PersonalInfo() {
    const router = useRouter();
    const { username, userEmail, gender, login, birth, clearUser } = useUserStore();
    const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_TEMP_TOKEN;

    // 로그아웃 핸들러
    const handlerLogout = () => {
      localStorage.removeItem("token");
      clearUser();
      router.push(`/login`);
    }

    // 계정 탈퇴 핸들러
    const handleAccountWithdrawal = async() => {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/withdraw`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if(!res.ok) throw new Error(`계정 탈퇴 실패: ${res.status}`);

        const data = await res.json();
        console.log("계정 탈퇴 결과: ", data);

        if(data.success) {
          console.log("계정 탈퇴 성공");
          handlerLogout();
        } else {
          console.log("계정 탈퇴 실패");
        }
        
      } catch(err) {
        console.log("계정 탈퇴 오류: ", err);
      }
    }

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
          <ProfilePersonalContent title="이름" content={username} />
          <ProfilePersonalContent title="로그인 방식" content={loginMap[login]} />
          <ProfilePersonalContent title="이메일 정보" content={userEmail}/>
          <ProfilePersonalContent title="생년월일" content={birth} />
          <ProfilePersonalContent title="성별" content={genderMap[gender]} />
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
          <LogoutText onClick={handlerLogout}>로그아웃</LogoutText>
          <LogoutText onClick={handleAccountWithdrawal}>계정 탈퇴</LogoutText>
        </Box>
      </Box>
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