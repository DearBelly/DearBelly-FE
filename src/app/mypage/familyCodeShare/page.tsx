"use client";

import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";

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
          objectType: "text",
          text: `${name}님의 가족 공유 코드: ${familyCode}`,
          link: {
            mobileWebUrl: "http://localhost:3000",
            webUrl: "http://localhost:3000",
          },
        });
    };

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
        </TopBarBottomButtonLayout>
    );
}
