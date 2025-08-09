"use client";
import { Box, Text } from "@chakra-ui/react";
import { InputBox } from "@/components/TextField/InputBox";
import { Maternity } from "@/components/UserInfoForm/Maternity";
import Image from "next/image";
import { ProfileStepLayout } from "@/components/Layouts/ProfileStepLayout";
import { useState } from "react";

export default function SetupStep() {
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

  return (
    <ProfileStepLayout
      title="프로필을 만들어봐요"
      description="디어 벨리에서 사용할 닉네임을 만들어주세요"
      onNext={handleNextClick}
    >
      <Box display="flex" justifyContent="center">
        <Maternity />
      </Box>
    </ProfileStepLayout>
  );
}
