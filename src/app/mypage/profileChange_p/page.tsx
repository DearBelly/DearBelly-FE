"use client";
import { Box, Separator, useToken, Text } from "@chakra-ui/react";
import { InputBox } from "@/components/TextField/InputBox";
import Image from "next/image";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { useState, useEffect } from "react";
import { Toast } from "@/components/Toast/Toast";
import { InputBoxCalendar } from '@/components/TextField/InputBoxCalendar';
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function ProfileChange_p() {
    const name = '최푸른';

    const [nickname, setNickname] = useState("");
    const [isNicknameError, setIsNicknameError] = useState(false);
    // 토스트 띄우기 위한 상태관리
    const [showToast, setShowToast] = useState(false);
    // 토스트 버튼이 띄워지고 나면 버튼도 사라지고 이를 계속 유지해야 함
    const [hideButton, setHideButton] = useState(false);
    const [borderColor] = useToken("colors", ["border.border"]);

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

    return (
      <TopBarBottomButtonLayout 
        onNext={handleNextClick} 
        nextLabel="완료"
        // 닉네임이 비어있으면 비활성화시킴
        nextDisabled={nickname.trim() === ""}
        hideButton={hideButton}   
      >
        {/* 토스트 띄우기 */}
        {showToast && (
          <Box position="fixed" top="5.25rem" left="50%" transform="translateX(-50%)" zIndex={9999}>
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

        <Box 
          className="wrapper"
          display="flex" 
          flexDirection="column" 
          padding="0.75rem 0.5rem"
          borderRadius= '0.75rem'
          background= 'var(--Background-3, #FFF)'
        >
          <InputBox
            mode="transparent"
            title="닉네임"
            placeholder={name}
            value={nickname}
            onChange={handleNicknameChange}
            isError={isNicknameError}
            errorMessage="닉네임을 설정해주세요"
            disabled={hideButton}
          />

          <Separator mb='1rem' borderColor={borderColor} height="1px" />

          <InputBoxCalendar
            mode="transparent"
            title="마지막 생리 시작일"
            placeholder="0000.00.00."
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
        {!isLogin && <LoginModal />}
      </TopBarBottomButtonLayout>
    );
}
