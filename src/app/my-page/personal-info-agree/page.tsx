'use client';

import { useState, useEffect, ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { LoginModal } from '@/components/LoginModal/LoginModal';
import { useRouter } from "next/navigation";

export default function PersonalInfoAgree() {
    const router = useRouter();
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
        topbarTitle="Dear Belly 개인 정보 수집 동의"
        topbarBackground="filled"
      > 
        <Box className="contentWrapper" w="100%" maxW="33.75rem" mx="auto" mt="0.62rem 0">
          <TextSection>
            {`1. 수집하는 개인정보 항목

              가. 필수정보(회원)
                 • 아이디(이메일 또는 휴대전화), 이름(닉네임 가능), 성별, 출생년도, 비밀번호
              나. 자동 수집 정보
                 • 접속 로그, IP 정보, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록
              다. (서비스 특성상) 건강정보(민감정보) – 별도 동의서에서 받음
                 • 임신 관련 정보(예: 임신 주차, 마지막 생리일(LMP), 출산 예정일(EDD)), 검진 일정/메모, 증상·기록, 알림 설정 등


              2. 개인정보 수집 방법

              • 회원가입 및 프로필 입력 과정에서 이용자가 직접 입력·수정
              • 서비스 이용 과정에서 시스템 로그·쿠키 등 자동 수집


              3. 수집한 개인정보의 이용 목적

              • 회원가입, 본인 확인, 계정·활동 관리, 탈퇴 의사 확인 등 회원 관리
              • 서비스 이용 통계 분석, 맞춤형 임신/건강 콘텐츠 및 알림 제공
              • 신규 서비스 개발, 공지·이벤트 및 혜택 안내, 전자우편/푸시 알림
              • 민원 처리, 분쟁 조정을 위한 기록 보존 및 고지 사항 전달


              4. 보유 및 이용 기간

              • 원칙적으로 수집 및 이용 목적 달성 시 지체 없이 파기
              • 미이용 파기: 마지막 로그인 후 2년 경과 시 또는 회원 탈퇴·파기 요청 시 지체 없이 파기
              • 관계 법령에 의한 보관 의무가 있는 경우 해당 법령에서 정한 기간 동안 별도 보관

              
              5. 동의 거부 권리 및 불이익

              • 이용자는 개인정보 수집·이용에 대한 동의를 거부할 수 있습니다.
              • 다만, 필수항목 동의 거부 시 회원가입 및 서비스 기본 기능 이용이 제한될 수 있습니다.`}
          </TextSection>
        </Box>
        {!isLogin && <LoginModal onClose={() => {setIsLogin(false); router.push('/my-page');}} />}
      </MobileLayout>
    );
}

const TextSection = ({ children }: { children: ReactNode; }) => (
  <Box 
    width='100%' 
    p='0.63rem 0.5rem'
    whiteSpace="pre-line" 
    color="text.text1"
    textStyle="caption_12400"
    textAlign='justify'
  >
    {children}
  </Box>
);
