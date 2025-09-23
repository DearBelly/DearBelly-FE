"use client";

import { Box, Separator, useToken } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { CheckField } from "@/components/CheckField/CheckField";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useUserStore } from '@/store/useUserStore';
import { Toast } from "@/components/Toast/Toast";
import { useState, useEffect } from "react";
import { LoginModal } from '@/components/LoginModal/LoginModal';
import { useRouter } from "next/navigation";
import type { CategoryId } from "@/store/useCategoryStore"; 

export default function CategoryEdit() {
  const CATEGORY_ALL = "전체";
  const CATEGORY_LIST: { id: CategoryId; label: string }[] = [
    { id: "HEALTH", label: "신체건강" },
    { id: "FINANCIAL", label: "지원금" },
    { id: "PREGNANCY_PLANNING", label: "임신준비" },
    { id: "CHILD", label: "출산/육아" },
    { id: "EMOTIONAL", label: "정서" },
  ];

  const { checkedIds, toggle, toggleAll } = useCategoryStore();
  const allIds = CATEGORY_LIST.map((c) => c.id);
  const isAllChecked = checkedIds.length === allIds.length;
  const [borderColor] = useToken("colors", ["border.border"]);

  // 토스트 띄우기 위한 상태관리
  const [showToast, setShowToast] = useState(false);
  // 토스트 버튼이 띄워지고 나면 버튼도 사라지고 이를 계속 유지해야 함
  const [hideButton, setHideButton] = useState(false);
  // 로그인이 되어있는지, 안 되어 있는지 상태저장
  const [isLogin, setIsLogin] = useState(false);
  const { token } = useUserStore();

  const router = useRouter();
  // 토큰 체크 && 사용자 프로필에서 관심 카테고리 정보 불러와 해당 zustand에 저장 
  useEffect(() => {
    setIsLogin(!!token);

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.interests) {
            useCategoryStore.setState({ checkedIds: data.data.interests });
          }
        })
        .catch((err) => console.error("카테고리 불러오기 실패: ", err));
    }
  }, [token]);

  // 관심 카테고리 변경 
  const handleNextClick = async () => {
    if (!token) return;

    try {
      const payload = { interests: checkedIds };
      console.log("PATCH payload:", payload);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member/profile/categories`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("카테고리 수정 실패");

      setHideButton(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error("관심 카테고리 api 에러: ", error);
    }
  };

  return (
    <TopBarBottomButtonLayout
      onNext={handleNextClick}
      nextLabel="적용하기"
      topbarTitle="카테고리 수정"
      hideButton={hideButton}
      nextDisabled={false}
    >
      {/* 토스트 띄우기 */}
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
        w="100%"
        flex="1"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          className="wrapper"
          display="flex"
          flexDirection="column"
          mt="5.66dvh"
          padding="0.75rem 1rem"
          borderRadius="0.75rem"
          background="bg.bg3"
          w="100%"
          maxW="35rem"
          mx="auto"
        >
          <Box>
            <CheckField
              label={CATEGORY_ALL}
              key="all-category"
              checked={isAllChecked}
              onClick={() => toggleAll()}
            />
          </Box>

          <Separator mt="1rem" mb="1rem" borderColor={borderColor} height="1px" />

          <Box display="flex" flexDirection="column" gap="12px">
            {CATEGORY_LIST.map((category) => (
              <CheckField
                key={category.id}
                label={category.label}
                checked={checkedIds.includes(category.id)}
                onClick={() => toggle(category.id)}
              />
            ))}
          </Box>
        </Box>
        {!isLogin && (
          <LoginModal
            onClose={() => {
              setIsLogin(false);
              router.push("/my-page");
            }}
          />
        )}
      </Box>
    </TopBarBottomButtonLayout>
  );
}
