"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";
import { useSignupStore } from "@/store/useSignupStore";
import { validateNickname } from "@/utils/validators";

export default function SetupStep() {
  const router = useRouter();
  const params = useSearchParams();

  // ⬇️ 매 렌더링에서 최신 쿼리값을 가져오고, 그 값이 생기면 effect가 동작하게 함
  const code = params.get("code");
  const state = params.get("state");

  const { data, setData, nextStep } = useSignupStore();
  const [nickname, setNickname] = useState(data.nickname || "");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // code가 없으면 아무 것도 하지 않음 (초기 렌더 대비)
    if (!code) return;

    // 이미 토큰 있으면 URL만 정리
    if (localStorage.getItem("accessToken")) {
      router.replace("/profile/setup");
      return;
    }

    (async () => {
      try {
        const API = process.env.NEXT_PUBLIC_API_BASE_URL!;
        const url = `${API}/api/v1/auth/naver?code=${encodeURIComponent(code)}&state=${encodeURIComponent(
          state ?? ""
        )}`;

        const res = await fetch(url, {
          method: "POST",
          credentials: "include", // Refresh 쿠키 저장 필수
        });

        // 디버그용(원하면 주석 해제)
        const clone = res.clone();
        console.log("status", res.status);
        console.log("content-type", res.headers.get("content-type"));
        console.log("body", await clone.json().catch(async () => await res.text()));

        if (!res.ok) throw new Error("네이버 토큰 교환 실패");
        const json = await res.json();
        if (!json?.accessToken) throw new Error("accessToken 없음");

        localStorage.setItem("accessToken", json.accessToken);
      } catch (e) {
        console.error(e);
        // TODO: 에러 UI 필요 시 처리
      } finally {
        // 항상 쿼리 정리 (새로고침 루프 방지)
        router.replace("/profile/setup");
      }
    })();
  // ⬇️ code/state가 준비되면 이 때 실행되도록 의존성에 넣는다
  }, [code, state, router]);

  const validation = validateNickname(nickname);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) setNickname(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleNextClick = () => {
    if (!validation.valid || !preview) return;
    setData({ nickname: nickname.trim(), profileImage: preview });
    nextStep();
    router.push("/profile/info");
  };

  return (
    <TopBarBottomButtonLayout onNext={handleNextClick} nextDisabled={!validation.valid || !preview}>
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
          디어 벨리에서 사용할 닉네임을 만들어주세요
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
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
        ) : (
          <Image
            src="/images/icon_default_profile.svg"
            alt="profile-setup"
            width={80}
            height={80}
            style={{
              cursor: "pointer",
            }}
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
    </TopBarBottomButtonLayout>
  );
}
