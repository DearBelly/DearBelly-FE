"use client";

import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";

export default function FamilyStep() {
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
    <TopBarBottomButtonLayout onNext={handleNextClick}>
      <Box as="form" w="100%" mt="20px" onSubmit={(e) => {
        e.preventDefault();
        handleNextClick();
      }}>
        <Text textStyle="head_18700">가족 공유 코드를 입력해 주세요</Text>
        <Text textStyle="body_147002" mt="4px">
          코드를 입력하거나 다른 가족에게 전달해 주세요
        </Text>

        <Box mt="5.66dvh">
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
