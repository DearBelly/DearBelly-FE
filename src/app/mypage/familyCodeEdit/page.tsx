"use client";

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function FamilyCodeEdit() {
  const [familyCode, setFamilyCode] = useState("");
  const [isFamilyCodeError, setIsFamilyCodeError] = useState(false);

  const verify = (code: string) => code === "123456";

  const handleNextClick = () => {
    const ok = verify(familyCode);
    setIsFamilyCodeError(!ok);
    if (ok) {
      console.log("가족 코드 인증 성공 → 다음 단계로 진행");
    }
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
      onNext={handleNextClick}
      nextLabel="입력하기"
      topbarTitle='가족 공유 코드'
      nextDisabled={familyCode.trim() === ""}
    >
      <Box as="form" w="100%" mt="20px" onSubmit={(e) => {
        e.preventDefault();
        handleNextClick();
      }}>
        <Box mt="2.5vh">
          <InputBox
            mode="default"
            title="가족 공유 코드"
            placeholder="코드를 입력해 주세요"
            value={familyCode}
            onChange={(e) => setFamilyCode(e.target.value)}
            isError={isFamilyCodeError}
            errorMessage="잘못된 코드입니다."
          />
        </Box>
        {!isLogin && <LoginModal/>}
      </Box>
    </TopBarBottomButtonLayout>
  );
}
