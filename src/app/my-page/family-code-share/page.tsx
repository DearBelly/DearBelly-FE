"use client";

import { useEffect, useState } from "react";
import { Box, Portal } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { InputBox } from "@/components/TextField/InputBox";
import { useUserStore } from "@/store/useUserStore";
import { ChakraIcons } from "@/lib/withChakraIcon";
import { Toast } from "@/components/Toast/Toast";

export default function FamilyCodeShare() {
  const [familyCode, setFamilyCode] = useState("");
  const [copyMessage, setCopyMessage] = useState<string | null>(null); // (미사용 시 나중에 제거 권장)
  const [isError, setIsError] = useState(false); // (미사용 시 나중에 제거 권장)
  const { username } = useUserStore();
  const [showToast, setShowToast] = useState(false);

  // 토큰 체크 후 가족 코드 생성 api 호출
  useEffect(() => {
    if (typeof window === "undefined") return;

    const token =
      localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/family-code`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success && data.data) {
            console.log("가족 코드 생성 성공:", data.data);
            setFamilyCode(data.data);
          } else {
            console.error("가족 코드 생성 실패:", data.message);
          }
        })
        .catch((err) => {
          console.error("가족 코드 생성 API 호출 에러:", err);
        });
    }
  }, []);

  // SDK 초기화
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window as any).Kakao &&
      !(window as any).Kakao.isInitialized()
    ) {
      (window as any).Kakao.init(
        process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
      );
    }
  }, []);

  // 공유하기 함수
  const handleKakaoShare = () => {
    const { Kakao } = window as any;

    if (!Kakao) {
      alert("카카오 SDK가 로드되지 않음");
      return;
    }
    if (!Kakao.Share) {
      alert("카카오 Share 모듈이 준비되지 않음");
      return;
    }

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${username}님이 가족 코드를 공유했습니다`,
        description: `가족 공유 코드: ${familyCode}`,
        imageUrl: "https://www.dearbelly.site/images/shareImage.png",
        link: {
          mobileWebUrl: "https://www.dearbelly.site/",
          webUrl: "https://www.dearbelly.site/",
        },
      },
      buttons: [
        {
          title: "코드 입력하러 가기",
          link: {
            mobileWebUrl:
              "https://www.dearbelly.site/my-page/family-code-edit",
            webUrl: "https://www.dearbelly.site/my-page/family-code-edit",
          },
        },
      ],
    });
  };

  // 가족코드 복사하기
  const handleCopy = async () => {
    try {
      if (!familyCode) {
        setCopyMessage("복사할 가족 코드가 없습니다");
        setIsError(true);
        return;
      }

      await navigator.clipboard.writeText(familyCode);
      setCopyMessage("가족 코드가 복사되었습니다");
      setIsError(false);
      setShowToast(true);

      setTimeout(() => setShowToast(false), 2000);
      setTimeout(() => setCopyMessage(null), 2000);
    } catch (err) {
      console.log("복사 실패: ", err);
      setCopyMessage("복사 중 오류가 발생했습니다");
      setIsError(true);
    }
  };

  return (
    <TopBarBottomButtonLayout
      nextLabel="가족 코드 복사하기"
      topbarTitle="가족 공유 코드"
      nextDisabled={!familyCode}
      onNext={handleCopy}
    >
      {/* 토스트 띄우기 */}
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
            <Toast message="가족 코드가 복사되었습니다" />
          </Box>
        </Portal>
      )}

      <Box mt="2.5vh" w="100%" maxW="35rem" mx="auto">
        <InputBox
          mode="default"
          title="가족 공유 코드"
          value={familyCode || "코드 생성 중..."}
          readOnly
          icon={<ChakraIcons.ExternalLink color="icon.icon1" onClick={handleKakaoShare} cursor="pointer"/>}
        >
        </InputBox>
      </Box>
    </TopBarBottomButtonLayout>
  );
}
