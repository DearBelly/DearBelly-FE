"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";
import { TermsSheet } from '@/components/BottomSheets/TermsSheet'; 
import { useSignupStore } from "@/store/useSignupStore";
import { validateNickname } from "@/utils/validators";

export default function SetupStep(): JSX.Element {
  const router = useRouter();
  const { data, setData, nextStep } = useSignupStore();

  const [nickname, setNickname] = useState<string>(data.nickname || "");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const validation = validateNickname(nickname);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) setNickname(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return previewUrl;
    });

    setData({
      profileImageFile: file,
      profileImage: previewUrl,
      imageCommitted: false,
      imageObjectKey: undefined,
    });
  };

  const handleNextClick = () => {
    if (!validation.valid || !preview) return;
    setData({ nickname: nickname.trim(), profileImage: preview });
    nextStep();
    router.push("/profile/info");
  };

  const handleBackClick = () => {
    router.push("/login");
  };

  return (
    <TopBarBottomButtonLayout
      onNext={handleNextClick}
      nextDisabled={!validation.valid || !preview}
      onBack={handleBackClick}
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
        <Text textStyle="head_188001">프로필을 만들어봐요</Text>
        <Text textStyle="body_14400224" mt="4px">
          디어 벨리에서 사용할 닉네임과 프로필 이미지를 설정해주세요
        </Text>
      </Box>

      <Box display="flex" justifyContent="center" mt="5.66dvh" mb="32px">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        {preview ? (
          <Box
            w="80px"
            h="80px"
            position="relative"
            borderRadius="100%"
            overflow="hidden"
            cursor="pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src={preview}
              alt="profile-setup"
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
        ) : (
          <Image
            src="/images/icon_default_profile.svg"
            alt="profile-setup"
            width={80}
            height={80}
            style={{ cursor: "pointer" }}
            onClick={() => fileInputRef.current?.click()}
          />
        )}
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

      <Box w="100%" maxW="40rem" mx="0.25rem">
        <TermsSheet />
      </Box>
    </TopBarBottomButtonLayout>
  );
}
