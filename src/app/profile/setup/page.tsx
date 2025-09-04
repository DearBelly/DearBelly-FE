"use client";
import { Box, Text } from "@chakra-ui/react";
import { InputBox } from "@/components/TextField/InputBox";
import Image from "next/image";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNicknameStore } from "@/store/useNicknameStore";
import { validateNickname } from "./validateNickname";

export default function SetupStep() {
  const router = useRouter();
  const { nickname: savedNickname, setNickname: saveNickname } = useNicknameStore();
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (savedNickname && nickname === "") {
      setNickname(savedNickname);
    }
  }, [savedNickname, nickname]);

  const validation = validateNickname(nickname);

  const titleText = "프로필을 만들어봐요";
  const subTitleText = "디어 벨리에서 사용할 닉네임을 만들어주세요";

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) setNickname(value);
  };

  const handleNextClick = () => {
    const validation = validateNickname(nickname);
    if (!validation.valid) return;
    saveNickname(nickname.trim());
    router.push("/profile/info");
  };

  return (
    <TopBarBottomButtonLayout onNext={handleNextClick} nextDisabled={!validation.valid}>
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
      </Box>

      <Box display="flex" justifyContent="center" mt="5.66dvh" mb="32px">
        <Image src="/images/set_profile.svg" alt="profile-setup" width={80} height={80} />
      </Box>

      <InputBox
        mode="default"
        title="닉네임"
        placeholder="닉네임을 입력해 주세요"
        value={nickname}
        onChange={handleNicknameChange}
        guideMessage={validation.guideMessage}
        isError={!!validation.errorMessage}
        errorMessage={validation.errorMessage}
      />
    </TopBarBottomButtonLayout>
  );
}
