"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { ProfileStepLayout } from "@/components/Layouts/ProfileStepLayout";
import { InputBox } from "@/components/TextField/InputBox";
import { Button } from "@/components/Button/Button";
import { useGetBreakPointValue } from "@/context/BreakPointProvider";

export default function FamilyStep() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const [familyCode, setFamilyCode] = useState("");
  const [isFamilyCodeError, setIsFamilyCodeError] = useState(false);

  /* 추후 서버와 연동하여 코드 인증 로직 수정 예정 */
  const handleVerifyClick = () => {
    if (familyCode !== "123456") {
      setIsFamilyCodeError(true);
    } else {
      setIsFamilyCodeError(false);
      console.log("가족 코드 인증 성공");
    }
  };

  const handleNextClick = () => {
    console.log("다음");
  };

  const content = (
    <ProfileStepLayout
      title="가족 공유 코드를 입력해 주세요"
      description="코드를 입력하거나 다른 가족에게 전달해 주세요"
      onNext={handleNextClick}
    >
      <InputBox
        mode="default"
        title="가족 공유 코드"
        placeholder="코드를 입력해 주세요"
        value={familyCode}
        onChange={(e) => setFamilyCode(e.target.value)}
        isError={isFamilyCodeError}
        errorMessage="잘못된 인증 코드입니다"
      />
      <Box mt="12px">
        <Button
          type="secondary"
          size="medium"
          width="100%"
          onClick={handleVerifyClick}
        >
          코드 인증하기
        </Button>
      </Box>
    </ProfileStepLayout>
  );

  return isMobile ? content : content;
}
