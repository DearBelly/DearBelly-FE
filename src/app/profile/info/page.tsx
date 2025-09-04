"use client";
import { Box, Text } from "@chakra-ui/react";
import { InputBox } from "@/components/TextField/InputBox";
import Image from "next/image";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { useState } from "react";
import { useGetBreakPointValue } from "@/context/BreakPointProvider";
import { useRouter } from "next/navigation";
import { useNicknameStore } from "@/store/useNicknameStore";

export default function InfoStep() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;
  
  const router = useRouter();

  const { nickname } = useNicknameStore(); 

  const titleText = `${nickname}에 대해 알려주세요`;
  const subTitleText = "필수 항목을 입력하고 맞춤 소식을 받아요";


  const handleNextClick = () => {
    router.push("/profile/interests");
  };

  const content = (
    <TopBarBottomButtonLayout onNext={handleNextClick}>
      <Box as="form" w="100%" mt="20px" onSubmit={(e) => {
        e.preventDefault();
        handleNextClick();
      }}>
        <Text textStyle="head_188001">{titleText}</Text>
        <Text textStyle="body_14400224" mt="4px">
          {subTitleText}
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

    </TopBarBottomButtonLayout>
  );

  return isMobile ? content : content;
}
