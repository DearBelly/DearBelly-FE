"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";
import { Button } from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { useSignupStore } from "@/store/useSignupStore";
import { useFamilyCodeStore } from "@/store/useFamilyCodeStore";
import { useState, useMemo } from "react";
import { validateFamilyCode } from "@/utils/validators";

export default function FamilyStep() {
  const router = useRouter();
  const { data, setData } = useSignupStore();
  const { familyCode, isVerified } = data;
  const { isLoading, verify, reset, errorMessage: serverErrorMessage } = useFamilyCodeStore();

  const [clientErrorMessage, setClientErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const API = process.env.NEXT_PUBLIC_API_BASE_URL!;

  const errorMessage = useMemo(
    () => clientErrorMessage ?? serverErrorMessage ?? "",
    [clientErrorMessage, serverErrorMessage]
  );

  const handleFamilyCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; 
    if (value.length <= 20) {
      setData({ familyCode: value, isVerified: false });
      setClientErrorMessage(null);
    }
  };

  const handleVerifyClick = async () => {
    if (!familyCode) return;

    const msg = validateFamilyCode(familyCode);
    if (msg) {
      setData({ isVerified: false });
      setClientErrorMessage(msg);
      return;
    }

    const ok = await verify(familyCode);
    setData({ isVerified: ok });
    if (!ok && !clientErrorMessage) {
    }
  };

  const formatDot = (s: string) => s.replace(/-/g, ".");

  const buildProfileParams = () => {
    const params = new URLSearchParams();
    params.set("nickname", data.nickname);
    params.set("isPregnant", String(data.isPregnant));

    if (data.isPregnant) {
      if (data.isExpectingMother) {
        params.set("pre_pregnant", "true");
      } else {
        params.set("pre_pregnant", "false");
        if (data.LMP) params.set("lmpDate", formatDot(data.LMP));
      }
    }

    params.set("gender", data.gender);
    params.set("birth", formatDot(data.birth));

    for (const c of data.interestingInformation) {
      params.append("categories", c);
    }
    return params;
  };

  const handleSignup = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setIsSubmitting(false);
      router.replace("/login");
      return;
    }

    const url = `${API}/api/v1/member/profile?${buildProfileParams().toString()}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `회원정보 등록 실패 (HTTP ${res.status})`);
      }
      router.push("/home");
    } catch (err) {
      console.error("회원정보 저장 오류", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    router.push("/profile/interests");
  };

  return (
    <TopBarBottomButtonLayout
      onNext={handleSignup}
      nextLabel="가입 완료"
      onBack={handleBackClick}
      nextDisabled={!isVerified || isSubmitting}
    >
      <Box as="form" w="100%" mt="20px" onSubmit={(e) => e.preventDefault()}>
        <Text textStyle="head_188001">가족 공유 코드를 입력해주세요</Text>
        <Text textStyle="body_14400224" mt="4px">
          코드를 입력해주세요
        </Text>

        <Flex mt="5.66dvh" gap="0.75rem" flexDirection="column">
          <InputBox
            mode="default"
            title="가족 공유 코드"
            placeholder="코드를 입력해 주세요"
            value={familyCode || ""}
            onChange={handleFamilyCodeChange}
            isError={!!errorMessage}
            isDisabled={isVerified}
            errorMessage={errorMessage || ""}
            maxLength={20} 
          />
          <Button
            type="secondary"
            size="medium"
            width="100%"
            onClick={handleVerifyClick}
            isDisabled={!familyCode?.trim() || isLoading || isVerified}
          >
            <Text textStyle="caption_12800" color="button.text.teritery">
              {isLoading ? "인증 중" : "코드 인증하기"}
            </Text>
          </Button>
        </Flex>

        <Text
          position="absolute"
          textStyle="body_14700120"
          color="icon.icon1"
          textAlign="center"
          left="0"
          right="0"
          bottom="4.5rem"
          onClick={() => {
            if (isSubmitting) return;
            setData({ familyCode: undefined, isVerified: false });
            reset();
            handleSignup();
          }}
        >
          지금은 넘어가기
        </Text>
      </Box>
    </TopBarBottomButtonLayout>
  );
}
