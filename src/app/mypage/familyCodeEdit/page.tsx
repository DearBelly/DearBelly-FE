"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";

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
      </Box>
    </TopBarBottomButtonLayout>
  );
}
