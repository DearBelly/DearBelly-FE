"use client";
import { Box, Text } from "@chakra-ui/react";
import { InputBox } from "@/components/TextField/InputBox";
import Image from "next/image";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { useState } from "react";
import { useGetBreakPointValue } from "@/context/BreakPointProvider";

export default function SetupStep() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const [nickname, setNickname] = useState("");
  const [isNicknameError, setIsNicknameError] = useState(false);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setNickname(value);
      if (value.trim() !== "") {
        setIsNicknameError(false);
      }
    }
  };

  const handleNextClick = () => {
    if (nickname.trim() === "") {
      setIsNicknameError(true);
      return;
    }

    setIsNicknameError(false);
    console.log("다음");
  };

  const content = (
    <TopBarBottomButtonLayout onNext={handleNextClick}>
      <Box as="form" w="100%" mt="20px" onSubmit={(e) => {
        e.preventDefault();
        handleNextClick();
      }}>
        <Text textStyle="head_18700">관심있는 정보 항목을 눌러주세요</Text>
        <Text textStyle="body_14400224" mt="4px">
          눌러주신 카테고리를 위주로 준비해드릴게요
        </Text>
      </Box>

      <Box display="flex" justifyContent="center" mt="5.66dvh" mb="32px">
        <Image
          src="/images/set_profile.svg"
          alt="profile-setup"
          width={80}
          height={80}
        />
      </Box>

      <InputBox
        mode="default"
        title="닉네임"
        placeholder="닉네임을 입력해 주세요"
        value={nickname}
        onChange={handleNicknameChange}
        message="공백 포함 최대 10자까지 설정할 수 있어요"
        isError={isNicknameError}
        errorMessage="닉네임을 설정해주세요"
      />
    </TopBarBottomButtonLayout>
  );

  return isMobile ? content : content;
}
