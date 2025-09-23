"use client";
import { Box, Separator, Text, Input } from "@chakra-ui/react";
import { InputBox } from "@/components/TextField/InputBox";
import Image from "next/image";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import React, { useState, useEffect, useRef } from "react";
import { Toast } from "@/components/Toast/Toast";
import { InputBoxCalendar } from '@/components/TextField/InputBoxCalendar';
import { LoginModal } from '@/components/LoginModal/LoginModal';
import { useUserStore } from "@/store/useUserStore";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function ProfileChangeMaternity() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { token, username, profileImg, impDate } = useUserStore();

  // 마지막 생리 시작일을 Date 기반으로 관리
  const [lastImpDate, setLastImpDate] = useState<Date | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsLogin(!!token);
    if (impDate) {
      setLastImpDate(impDate);
    }
  }, [token, impDate]);

  useEffect(() => {
    console.log("zustand impDate:", impDate);
    console.log("local lastImpDate:", lastImpDate);
  }, [impDate, lastImpDate]);

  // 닉네임 변경
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setName(value);
      if (value.trim() !== "") {
        setIsNicknameError(false);
      }
    }
  };

  // 마지막 생리 날짜 변경
  const handleImptDateChange = (date: Date | null) => {
    setLastImpDate(date);
  };

  // 프로필 이미지 선택
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 프로필 이미지 변경
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setSelectedImg(url);
    }
  };

  // 완료 버튼 클릭 시 patch api 호출
  const handleNextClick = async () => {
    if (name.trim() === "") {
      setIsNicknameError(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nickname", name);
      // Date -> string 변환 후 API 전달
      formData.append("ImpDate", lastImpDate ? format(lastImpDate, "yyyy-MM-dd") : "");

      if (fileInputRef.current?.files?.[0]) {
        formData.append("imgFile", fileInputRef.current.files[0]);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member/profile/edit`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("프로필 변경 실패");

      const result = await response.json();
      console.log("응답 : ", result);

      setHideButton(true);
      setIsNicknameError(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TopBarBottomButtonLayout
      onNext={handleNextClick}
      nextLabel="완료"
      nextDisabled={name.trim() === ""}
      hideButton={hideButton}
    >
      {/* 토스트 */}
      {showToast && (
        <Box
          position="fixed"
          top="5.25rem"
          left="50%"
          transform="translateX(-50%)"
          zIndex={9999}
        >
          <Toast />
        </Box>
      )}

      <Box
        className="content"
        flex="1"
        width="100%"
        maxW="35rem"
        mx="auto"
      >
        {/* 프로필 이미지 */}
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
              src={selectedImg || profileImg || "/images/set_profile.svg"}
              alt="profile-setup"
              fill
              style={{ objectFit: "cover" }}
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

        {/* 입력 영역 */}
        <Box
          className="wrapper"
          display="flex"
          flexDirection="column"
          padding="0.75rem 0.5rem"
          borderRadius="0.75rem"
          background="bg.bg3"
        >
          <InputBox
            mode="transparent"
            title="닉네임"
            placeholder={username}
            value={name}
            onChange={handleNicknameChange}
            isError={isNicknameError}
            errorMessage="닉네임을 설정해주세요"
          />

          <Separator mb="1rem" borderColor="border.border" height="1px" />

          <InputBoxCalendar
            mode="transparent"
            title="마지막 생리 시작일"
            placeholder="0000.00.00."
            value={lastImpDate}
            onChange={handleImptDateChange}
            disabled={hideButton}
          />
        </Box>

        <Text
          textStyle="caption_12400"
          mt="0.8rem"
          ml="1rem"
          color="text.text3"
        >
          공백 포함 최대 10자까지 설정할 수 있어요.
        </Text>
      </Box>
      {!isLogin && <LoginModal onClose={() => {setIsLogin(false); router.push('/my-page');}} />}
    </TopBarBottomButtonLayout>
  );
}
