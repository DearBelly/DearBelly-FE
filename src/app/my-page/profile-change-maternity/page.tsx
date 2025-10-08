"use client";
import { Box, Separator, Text, Input, Portal } from "@chakra-ui/react";
import { InputBox } from "@/components/TextField/InputBox";
import Image from "next/image";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import React, { useState, useEffect, useRef } from "react";
import { Toast } from "@/components/Toast/Toast";
import { InputBoxCalendar } from '@/components/TextField/InputBoxCalendar';
import { useUserStore } from "@/store/useUserStore";
import { format, parse, parseISO } from "date-fns";
import { useRouter } from "next/navigation";

export default function ProfileChangeMaternity() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_TEMP_TOKEN;
  const username = useUserStore((s) => s.username);
  const profileImg = useUserStore((s) => s.profileImg);
  const impDate = useUserStore((s) => s.impDate);
  const setUser = useUserStore((s) => s.setUser);

  const [lastImpDate, setLastImpDate] = useState<Date | null>(null);

  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 어떤 형태든 안전하게 Date로 변환
  const toDateSafe = (v: unknown): Date | null => {
    if (!v) return null;
    if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
    if (typeof v === "string") {
      const s = v.replace(/\.$/, "");
      try {
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
          const d = parseISO(s);
          return isNaN(d.getTime()) ? null : d;
        }
        const d = parse(s, "yyyy.MM.dd", new Date());
        return isNaN(d.getTime()) ? null : d;
      } catch {
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    setLastImpDate(toDateSafe(impDate));
  }, [impDate]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setName(value);
      if (value.trim() !== "") setIsNicknameError(false);
    }
  };

  const handleImptDateChange = (date: Date | null) => {
    setLastImpDate(date);
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

  // 이미지 업로드
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

    // 최신 프로필 반영
    try {
      const meRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const me = await meRes.json();
      if (me?.data?.imgUrl) setUser({ profileImg: me.data.imgUrl });
    } catch {}
  };

  // 완료 버튼 클릭 시 patch 호출함
  const handleNextClick = async () => {
    try {
      if (selectedFile) {
        await uploadProfileImage(selectedFile);
      }

      const nicknameToSend = (name.trim() || username || "").trim();
      const lmpToSendDate = lastImpDate || toDateSafe(impDate);
      const lmpToSend = lmpToSendDate ? format(lmpToSendDate, "yyyy-MM-dd") : "";

      if (!nicknameToSend || !lmpToSend) {
        console.warn("PATCH 스킵: nickname 또는 lmpDate가 비어있음", { nicknameToSend, lmpToSend });
      }

      const payload = { nickname: nicknameToSend, lmpDate: lmpToSend };
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
      console.log("프로필 텍스트 변경 응답:", result);

      if (nicknameToSend !== username || lmpToSend !== impDate) {
        setUser({
          ...(nicknameToSend ? { username: nicknameToSend } : {}),
          ...(lmpToSend ? { impDate: lmpToSend } : {}),
        });
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

        <Box className="wrapper" display="flex" flexDirection="column" padding="0.75rem 0.5rem" borderRadius="0.75rem" background="bg.bg3">
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

        <Text textStyle="caption_12400" mt="0.8rem" ml="1rem" color="text.text3">
          공백 포함 최대 10자까지 설정할 수 있어요.
        </Text>
      </Box>
    </TopBarBottomButtonLayout>
  );
}
