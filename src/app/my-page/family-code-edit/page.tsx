"use client";

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";
import { LoginModal } from "@/components/LoginModal/LoginModal";
import { useRouter } from "next/navigation";

export default function FamilyCodeEdit() {
  const [familyCode, setFamilyCode] = useState("");
  const [isFamilyCodeError, setIsFamilyCodeError] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;

  // 토큰 체크
  useEffect(() => {
    setIsLogin(!!token);
  }, []);

  const joinFamily = async (code: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/family-code/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("가족 참여 성공:", data.data);
        router.push("/my-page/family-inventory");
      } else {
        console.error("가족 참여 실패:", data.message);
        setIsFamilyCodeError(true);
      }
    } catch (err) {
      console.error("가족 참여 API 호출 오류:", err);
      setIsFamilyCodeError(true);
    }
  };

  const handleNextClick = async () => {
    if (!familyCode.trim()) return;
    await joinFamily(familyCode);
  };

  return (
    <TopBarBottomButtonLayout
      onNext={handleNextClick}
      nextLabel="입력하기"
      topbarTitle="가족 공유 코드"
      nextDisabled={familyCode.trim() === ""}
    >
      <Box
        as="form"
        w="100%"
        maxW="35rem"
        mt="20px"
        mx="auto"
        onSubmit={(e) => {
          e.preventDefault();
          handleNextClick();
        }}
      >
        <Box mt="2.5vh">
          <InputBox
            mode="default"
            title="가족 공유 코드"
            placeholder="코드를 입력해 주세요"
            value={familyCode}
            onChange={(e) => {
              setFamilyCode(e.target.value);
              setIsFamilyCodeError(false);
            }}
            isError={isFamilyCodeError}
            errorMessage="잘못된 코드입니다."
          />
        </Box>

        {!isLogin && (
          <LoginModal
            onClose={() => {
              setIsLogin(false);
              router.push("/my-page");
            }}
          />
        )}
      </Box>
    </TopBarBottomButtonLayout>
  );
}
