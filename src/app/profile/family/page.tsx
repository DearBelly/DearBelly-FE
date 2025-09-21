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
      setErrorMessage(null);
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
      setErrorMessage(null);
    }
  };

  const formatDate = (date: string) => date.replace(/-/g, ".");

  const handleNextClick = async () => {
    const token =
      localStorage.getItem("accessToken") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
  
    const params = new URLSearchParams();
    params.append("nickname", data.nickname);
    params.append("isPregnant", String(data.isPregnant));
  

    if (data.isPregnant) {
      if (data.isExpectingMother) {
        params.append("pre_pregnant", "true");
      } else {
        params.append("pre_pregnant", "false");
        if (data.LMP) params.append("lmpDate", formatDate(data.LMP));
      }
    }
    params.append("gender", data.gender);
    params.append("birth", formatDate(data.birth));
  
    if (data.interestingInformation.length > 0) {
      data.interestingInformation.forEach((id) =>
        params.append("categories", id)
      );
    }
  
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member/profile?${params.toString()}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (!res.ok) throw new Error("회원정보 등록 실패");
      const result = await res.json();
      console.log("회원정보 저장 성공", result);
  
      router.push("/home");
    } catch (err) {
      console.error("회원정보 저장 오류", err);
    }
  };
  

  const handleBackClick = () => {
    router.push("/profile/interests");
  };

  const handleMoveToHome = () => {
    useSignupStore.getState().reset();
    router.push("/home");
  };

  return (
    <TopBarBottomButtonLayout
      onNext={handleNextClick}
      nextLabel="가입 완료"
      onBack={handleBackClick}
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
