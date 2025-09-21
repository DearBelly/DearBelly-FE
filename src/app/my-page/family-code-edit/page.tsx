"use client";

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";
import { LoginModal } from '@/components/LoginModal/LoginModal';
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function FamilyCodeEdit() {
  const [familyCode, setFamilyCode] = useState("");
  const [isFamilyCodeError, setIsFamilyCodeError] = useState(false);
  // 로그인이 되어있는지, 안 되어 있는지 상태저장
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const { token } = useUserStore();

  // 토큰 체크
  useEffect(() => {
    setIsLogin(!!token);
  }, []);

  // 가족 코드 api 연동
  const validateFamilyCode = async (code: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/family-code/members`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error("가족 코드 유효성 검사 실패");
      const data = await response.json();

      if(data.success) {
        console.log("가족 코드 유효함, 사용자 목록: ", data.data);
        return true;
      } else {
        throw new Error("가족 코드 유효하지 않음")
      } 
    } catch(error) {
        console.log("가족 코드 검증 실패: ", error);
        return false;
    }
  };

  // 가족 참여 api
  const joinFamily = async (code: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/family-code/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error("가족 참여 실패");
      const data = await response.json();

      if(data.success) {
        console.log("가족 참여 성공: ", data.data);
        // 참여 성공 시 가족 목록 페이지로 이동시키기
        router.push("/my-page/family-inventory");
      } else {
        throw new Error(data.message || "가족 참여 실패");
      }
    } catch(err) {
      console.log("가족 참여 API 실패: ", err);
    }
  };

  const handleNextClick = async() => {
    if(!familyCode.trim()) return;
    const isValid = await validateFamilyCode(familyCode);
    if(!isValid) {
      setIsFamilyCodeError(true);
      return;
    } 
    setIsFamilyCodeError(false);
    await joinFamily(familyCode);
  };

  return (
    <TopBarBottomButtonLayout 
      onNext={handleNextClick}
      nextLabel="입력하기"
      topbarTitle='가족 공유 코드'
      nextDisabled={familyCode.trim() === ""}
    >
      <Box as="form" w="100%" maxW="35rem" mt="20px" mx="auto" onSubmit={(e) => {
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
