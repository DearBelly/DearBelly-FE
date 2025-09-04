"use client";

import { useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/Button";
import { useFamilyCodeStore } from "@/store/useFamilyCodeStore";

export default function FamilyStep() {
  const router = useRouter();

  const { isVerified, isError, isLoading, verify, reset } = useFamilyCodeStore();
  const [familyCode, setFamilyCode] = useState("");

  const titleText = "가족 공유 코드를 입력해 주세요";
  const subTitleText = "코드를 입력하거나 다른 가족에게 전달해 주세요";

  const handleFamilyCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setFamilyCode(value);
      reset();
    }
  };

  const handleVerifyFamilyCodeClick = async () => {
    await verify();
  };

  const handleNextClick = () => {
    if (!isVerified) return;
    router.push("/home");
  };

  return (
    <TopBarBottomButtonLayout
      onNext={handleNextClick}
      nextLabel="가입 완료"
      nextDisabled={!isVerified}
    >
      <Box
        as="form"
        w="100%"
        mt="20px"
        onSubmit={(e) => {
          e.preventDefault();
          handleNextClick();
        }}
      >
        <Text textStyle="head_188001">{titleText}</Text>
        <Text textStyle="body_14400224" mt="4px">
          {subTitleText}
        </Text>

        <Flex mt="5.66dvh" gap="0.75rem" flexDirection="column">
          <InputBox
            mode="default"
            title="가족 공유 코드"
            placeholder="코드를 입력해 주세요"
            value={familyCode}
            onChange={handleFamilyCodeChange}
            isError={isError} 
            errorMessage="잘못된 코드입니다."
          />
          <Button
            type="secondary"
            size="medium"
            width="100%"
            onClick={handleVerifyFamilyCodeClick}
            isDisabled={!familyCode || isLoading}
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
            router.push("/home");
          }}
        >
          지금은 넘어가기
        </Text>
      </Box>
    </TopBarBottomButtonLayout>
  );
}
