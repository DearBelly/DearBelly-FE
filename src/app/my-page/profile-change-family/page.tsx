"use client";

import { Box, Input, Portal } from "@chakra-ui/react";
import { InputBox } from "@/components/TextField/InputBox";
import Image from "next/image";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import React, { useState, useEffect, useRef } from "react";
import { Toast } from "@/components/Toast/Toast";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export default function ProfileChangeFamily() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const { username, profileImg, setUser } = useUserStore();
  const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_TEMP_TOKEN;

  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setName(value);
      if (value.trim() !== "") {
        setIsNicknameError(false);
      }
    }
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setSelectedImg(url);
      setSelectedFile(file);
    }
  };

  const uploadProfileImage = async (file: File) => {
    const urlRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member/profile/upload-url?filename=${encodeURIComponent(file.name)}`,
      { method: "GET", headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
    );
    if (!urlRes.ok) throw new Error("업로드 URL 발급 실패");

    const urlJson = await urlRes.json();
    const putUrl: string = urlJson?.data?.putUrl;
    const objectKey: string = urlJson?.data?.objectKey;
    if (!putUrl || !objectKey) throw new Error("업로드 URL/키 누락");

    const putRes = await fetch(putUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body: file,
    });
    if (!putRes.ok) throw new Error("S3 업로드 실패");

    const commitRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member/profile/image/commit`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ objectKey }),
      }
    );
    if (!commitRes.ok) throw new Error("이미지 커밋 실패");

    const commitJson = await commitRes.json();
    console.log("이미지 커밋 완료:", commitJson);

    try {
      const meRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const me = await meRes.json();
      if (me?.data?.imgUrl) setUser({ profileImg: me.data.imgUrl });
    } catch {}
  };

  const handleNextClick = async () => {
    try {
      if (selectedFile) {
        await uploadProfileImage(selectedFile);
      }

      const nicknameToSend = (name.trim() || username || "").trim();

      if (!nicknameToSend) {
        setIsNicknameError(true);
        return;
      }

      const payload = { nickname: nicknameToSend }; 
      console.log("PATCH /profile/edit payload:", payload);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member/profile/edit`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        console.error("PATCH 실패 상태코드:", response.status, text);
        throw new Error("프로필 변경 실패");
      }

      const result = await response.json().catch(() => ({}));
      console.log("프로필 변경 응답:", result);

      if (nicknameToSend !== username) {
        setUser({ username: nicknameToSend });
      }

      setHideButton(true);
      setIsNicknameError(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error(error);
      setIsNicknameError(name.trim() === "");
    }
  };

  return (
    <TopBarBottomButtonLayout
      onNext={handleNextClick}
      nextLabel="완료"
      hideButton={hideButton}
    >   
      {showToast && (
        <Portal>
          <Box
            position="fixed"
            top="5%"
            left="50%"
            transform="translateX(-50%)"
            zIndex={99999}
            pointerEvents="auto"
          >
            <Toast />
          </Box>
        </Portal>
      )}

      <Box className="content" flex="1" width="100%" maxW="35rem" mx="auto">
        <Box display="flex" justifyContent="center" mt="5.66dvh" mb="32px">
          <Box
            className="imgWrapper"
            position="relative"
            w="5rem"
            h="5rem"
            maxW="100%"
            overflow="hidden"
            flexShrink={0}
            borderRadius="50%"
            onClick={handleImageClick}
            cursor="pointer"
          >
            <Image
              src={selectedImg || profileImg || "/images/icon_default_profile.svg"}
              alt="profile-setup"
              fill
              style={{ 
                objectFit: "cover",
                display: loaded ? 'block' : 'none',
              }}
              onLoad={() => setLoaded(true)}
            />
            <Input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              display="none"
            />
          </Box>
        </Box>

        <InputBox
          mode="default"
          title="닉네임"
          placeholder={username}
          value={name}
          onChange={handleNicknameChange}
          guideMessage="공백 포함 최대 10자까지 설정할 수 있어요"
          isError={isNicknameError}
          errorMessage="닉네임을 설정해주세요"
        />
      </Box>
    </TopBarBottomButtonLayout>
  );
}
