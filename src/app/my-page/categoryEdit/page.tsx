"use client";
import { Box, Separator, useToken } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { CheckField } from "@/components/CheckField/CheckField";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Toast } from "@/components/Toast/Toast";
import { useState, useEffect } from "react";
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function CategoryEdit() {
  const CATEGORY_ALL = "전체";
  const CATEGORY_LIST = [
    { id: "health", label: "신체건강" },
    { id: "mind", label: "정신건강" },
    { id: "money", label: "지원금" },
    { id: "granulation", label: "임신전반" },
    { id: "education", label: "교육" },
    { id: "ready", label: "임신준비" },
  ];

  const checkedIds = useCategoryStore((state) => state.checkedIds);
  const toggle = useCategoryStore((state) => state.toggle);
  const toggleAll = useCategoryStore((state) => state.toggleAll);

  const allIds = CATEGORY_LIST.map((c) => c.id);
  const isAllChecked = checkedIds.length === allIds.length;
  const [borderColor] = useToken("colors", ["border.border"]);

  // 토스트 띄우기 위한 상태관리
  const [showToast, setShowToast] = useState(false);
  // 토스트 버튼이 띄워지고 나면 버튼도 사라지고 이를 계속 유지해야 함
  const [hideButton, setHideButton] = useState(false);

  const handleNextClick = () => {
    console.log("선택된 카테고리---", checkedIds);

    setHideButton(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }

    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);

    // 토큰 체크
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);
  }, []);

  return (
    <TopBarBottomButtonLayout 
        onNext={handleNextClick} 
        nextLabel="적용하기"
        topbarTitle='카테고리 수정'
        hideButton={hideButton}   
        nextDisabled={false} 
    >
      {/* 토스트 띄우기 */}
      {showToast && (
        <Box position="fixed" top="5.25rem" left="50%" transform="translateX(-50%)" zIndex={9999}>
          <Toast/>
        </Box>
      )}

    <Box 
        className="wrapper"
        display="flex" 
        flexDirection="column" 
        mt="5.66dvh"
        padding="0.75rem 1rem"
        borderRadius= '0.75rem'
        background= 'var(--Background-3, #FFF)'
    >
      <Box as="form" w="100%" onSubmit={(e) => {
        e.preventDefault();
        handleNextClick();
      }}>
      </Box>
      <Box>
        <CheckField
          label={CATEGORY_ALL}
          key="all-category"
          checked={isAllChecked}
          onClick={() => toggleAll(allIds)}
        />
      </Box>

      <Separator mt="1rem" mb="1rem" borderColor={borderColor} height="1px" />

      <Box display="flex" flexDirection="column" gap="12px">
        {CATEGORY_LIST.map((category) => (
              <CheckField
                key={category.id}
                label={category.label}
                checked={checkedIds.includes(category.id)}
                onClick={() => {
                    toggle(category.id);
                    console.log(
                    checkedIds.includes(category.id)
                        ? `선택 해제됨: ${category.label}`
                        : `선택됨: ${category.label}`
                    );
                }}
              />
          ))}
      </Box>
      {!isLogin && <LoginModal />}
    </Box>
    </TopBarBottomButtonLayout>
  )
}
