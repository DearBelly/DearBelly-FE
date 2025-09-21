"use client";

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";
import { LoginModal } from '@/components/LoginModal/LoginModal';
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export default function FamilyCodeShare() {
    const router = useRouter();
    const [familyCode, setFamilyCode] = useState("");
    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);
    const { token, username } = useUserStore();

    // 토큰 체크 후 가족 코드 생성 api 호출
    useEffect(() => {
      setIsLogin(!!token);

      // 토큰 존재 시 api 호출
      if(token) {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/family-code`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        .then((response) => response.json())
        .then((data) => {
          if(data.success && data.data) {
            console.log("가족 코드 생성 성공:", data.data);
            setFamilyCode(data.data);
          } else {
            console.error("가족 코드 생성 실패:", data.message);
          }
        }) .catch((err) => {
          console.error("가족 코드 생성 API 호출 에러:", err);
        });
      }
    }, []);

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
            title: `${username}님이 가족 코드를 공유했습니다`,
            description: `가족 공유 코드: ${familyCode}`,
            imageUrl: "https://www.dearbelly.site/images/shareImage.png",
            link: {
              mobileWebUrl: "https://www.dearbelly.site/",
              webUrl: "https://www.dearbelly.site/",
            },
          },
          buttons: [
            {
              title: "코드 입력하러 가기",
              link: {
                mobileWebUrl: "https://www.dearbelly.site/my-page/family-code-edit",
                webUrl: "https://www.dearbelly.site/my-page/family-code-edit",
              },
            },
          ],
      });
    };

    return (
        <TopBarBottomButtonLayout 
          nextLabel="가족 코드 공유하기"
          topbarTitle='가족 공유 코드'
          nextDisabled={!familyCode}
          onNext={handleShare}
        >
            <Box mt="2.5vh" w='100%' maxW='35rem' mx='auto'>
              <InputBox
                  mode="default"
                  title="가족 공유 코드"
                  value={familyCode || "코드 생성 중..."}
                  readOnly 
              />  
            </Box>
            {!isLogin && <LoginModal onClose={() => {setIsLogin(false); router.push('/my-page');}} />}
        </TopBarBottomButtonLayout>
    );
}