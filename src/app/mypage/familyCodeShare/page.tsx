"use client";

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function FamilyCodeShare() {
    const familyCode='14X5TR27YJ';
    const name='김서진';

    // SDK 초기화
    useEffect(() => {
        if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
        }
      }, []);

    // 공유하기 함수
    const handleShare = () => {
        if (!window.Kakao) {
          alert("카카오 SDK가 로드되지 않음");
          return;
        }
        if (!window.Kakao.Share) {
          alert("카카오 Share 모듈이 준비되지 않음");
          return;
        }
      
        window.Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: "엄마를 위한 케어, 아이를 위한 기록 Dear Belly",
            description: "가족 기반 공유형 임신 기록 서비스",
          //   "https://myapp.vercel.app/images/shareImage.png"
            imageUrl: "http://localhost:3000/images/shareImage.png",
            link: {
              mobileWebUrl: "http://localhost:3000",
              webUrl: "http://localhost:3000",
            },
          },
          buttons: [
            {
              title: "자세히 보기",
              link: {
                mobileWebUrl: "http://localhost:3000/info/detail",
                webUrl: "http://localhost:3000/info/detail",
              },
            },
          ],
      });
    };

    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);

    // 토큰 체크
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);
  }, []);

    return (
        <TopBarBottomButtonLayout 
          nextLabel="가족 코드 공유하기"
          topbarTitle='가족 공유 코드'
          nextDisabled={false} 
          onNext={handleShare}
        >
            <Box mt="2.5vh">
              <InputBox
                  mode="default"
                  title="가족 공유 코드"
                  value={familyCode}
              />
            </Box>
            {!isLogin && <LoginModal />}
        </TopBarBottomButtonLayout>
    );
}
