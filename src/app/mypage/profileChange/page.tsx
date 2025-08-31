"use client";
import { Box } from "@chakra-ui/react";
import { InputBox } from "@/components/TextField/InputBox";
import Image from "next/image";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { useState, useEffect } from "react";
import { useGetBreakPointValue } from "@/context/BreakPointProvider";
import { Toast } from "@/components/Toast/Toast";
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function ProfileChange() {
    const name = '최푸른';
    const isPc = useGetBreakPointValue();
    const isMobile = !isPc;

    const [nickname, setNickname] = useState("");
    const [isNicknameError, setIsNicknameError] = useState(false);
    // 토스트 띄우기 위한 상태관리
    const [showToast, setShowToast] = useState(false);
    // 토스트 버튼이 띄워지고 나면 버튼도 사라지고 이를 계속 유지해야 함
    const [hideButton, setHideButton] = useState(false);

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.length <= 10) {
        setNickname(value);
        if (value.trim() !== "") {
          setIsNicknameError(false);
        }
      }
    };

    const handleNextClick = () => {
      if (nickname.trim() === "") {
        setIsNicknameError(true);
        return;
      }

      setHideButton(true);
      setIsNicknameError(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    };

    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);

    // 토큰 체크
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);
  }, []);

    const content = (
      <TopBarBottomButtonLayout 
        onNext={handleNextClick} 
        nextLabel="완료"
        // 닉네임이 비어있으면 비활성화시킴
        nextDisabled={nickname.trim() === ""}
        hideButton={hideButton}   
      >
        {/* 토스트 띄우기 */}
        {showToast && (
          <Box position="fixed" top="3rem" left="50%" transform="translateX(-50%)" zIndex={9999}>
            <Toast/>
          </Box>
        )}
        <Box display="flex" justifyContent="center" mt="5.66dvh" mb="32px">
          <Image
            src="/images/set_profile.svg"
            alt="profile-setup"
            width={80}
            height={80}
          />
        </Box>

        <InputBox
          mode="default"
          title="닉네임"
          placeholder={name}
          value={nickname}
          onChange={handleNicknameChange}
          guideMessage="공백 포함 최대 10자까지 설정할 수 있어요"
          isError={isNicknameError}
          errorMessage="닉네임을 설정해주세요"
          disabled={hideButton}
        />
        {!isLogin && <LoginModal />}
      </TopBarBottomButtonLayout>
    );

    return isMobile ? content : content;
}
