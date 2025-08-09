"use client";
import { Box, Text } from "@chakra-ui/react";
import { InputBox } from "@/components/TextField/InputBox";
import Image from "next/image";
import { ProfileStepLayout } from "@/components/Layouts/ProfileStepLayout";
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
    <ProfileStepLayout
      title="프로필을 만들어봐요"
      description="디어 벨리에서 사용할 닉네임을 만들어주세요"
      onNext={handleNextClick}
    >
      <Box display="flex" justifyContent="center" mb="32px">
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
    </ProfileStepLayout>
  );

  return isMobile ? content : content;
}
