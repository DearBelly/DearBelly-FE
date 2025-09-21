"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";
import { Button } from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { useSignupStore } from "@/store/useSignupStore";
import { useFamilyCodeStore } from "@/store/useFamilyCodeStore";
import { useState } from "react";
import { validateFamilyCode } from "@/utils/validators";

export default function FamilyStep() {
  const router = useRouter();
  const { data, setData } = useSignupStore();
  const { familyCode, isVerified } = data;
  const { isLoading, verify, reset } = useFamilyCodeStore();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFamilyCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setData({ familyCode: value, isVerified: false });
      setErrorMessage(null); // 입력 바뀌면 에러 초기화
    }
  };
    
const handleVerifyClick = async () => {
  if (!familyCode) return;

  const error = validateFamilyCode(familyCode);
  if (error) {
    setData({ isVerified: false });
    setErrorMessage("잘못된 코드입니다."); 
    return;
  }

  const ok = await verify(familyCode);
  setData({ isVerified: ok });

  if (!ok) {
    setErrorMessage("잘못된 코드입니다."); 
  } else {
    isVerified
    setErrorMessage(null); 
  }
};

  const handleNextClick = () => {
    if (!isVerified) return;
    handleMoveToHome();
  };

  const handleMoveToHome = () => {
    router.push("/home");
  };
  
  return (
    <TopBarBottomButtonLayout
      onNext={handleNextClick}
      nextLabel="가입 완료"
      nextDisabled={!isVerified}
    >
      <Box as="form" w="100%" mt="20px" onSubmit={(e) => e.preventDefault()}>
        <Text textStyle="head_188001">가족 공유 코드를 입력해 주세요</Text>
        <Text textStyle="body_14400224" mt="4px">
          코드를 입력하거나 다른 가족에게 전달해 주세요
        </Text>

        <Flex mt="5.66dvh" gap="0.75rem" flexDirection="column">
          <InputBox
            mode="default"
            title="가족 공유 코드"
            placeholder="코드를 입력해 주세요"
            value={familyCode || ""}
            onChange={handleFamilyCodeChange}
            isError={!!errorMessage}
            isDisabled={isVerified}
            errorMessage={errorMessage || ""}
          />
          <Button
            type="secondary"
            size="medium"
            width="100%"
            onClick={handleVerifyClick}
            isDisabled={!familyCode || isLoading || isVerified}
          >
            <Text textStyle="caption_12800" color="button.text.teritery">
              {isLoading ? "인증 중" : "코드 인증하기"}
            </Text>
          </Button>
        </Flex>

        <Text
          position="absolute"
          textStyle="body_14700120"
          color="icon.icon1"
          textAlign="center"
          left="0"
          right="0"
          bottom="4.5rem"
          onClick={() => {
            setData({ familyCode: undefined, isVerified: false });
            reset();
            handleMoveToHome();
          }}
        >
          지금은 넘어가기
        </Text>
      </Box>
    </TopBarBottomButtonLayout>
  );
}
