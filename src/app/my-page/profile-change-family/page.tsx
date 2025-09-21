"use client";
import { Box, Input } from "@chakra-ui/react";
import { InputBox } from "@/components/TextField/InputBox";
import Image from "next/image";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import React, { useState, useEffect, useRef } from "react";
import { Toast } from "@/components/Toast/Toast";
import { LoginModal } from '@/components/LoginModal/LoginModal';
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export default function ProfileChangeFamily() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [isNicknameError, setIsNicknameError] = useState(false);
    // 토스트 띄우기 위한 상태관리
    const [showToast, setShowToast] = useState(false);
    // 토스트 버튼이 띄워지고 나면 버튼도 사라지고 이를 계속 유지해야 함
    const [hideButton, setHideButton] = useState(false);
    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);
    const { token, username, profileImg } = useUserStore();

    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 토큰 체크
    useEffect(() => {
      setIsLogin(!!token);
    }, []);


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

    // 프로필 이미지 선택
    const handleImageClick = () => {
      fileInputRef.current?.click();
    };

    // 프로필 이미지 변경
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setSelectedImg(url);
      }
    };

    // 완료 버튼 클릭 시 patch api 호출
    const handleNextClick = async() => {
      // 이름이 비어있으면 에러 문구 뜨도록 설정
      if (name.trim() === "") {
        setIsNicknameError(true);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member/profile/edit`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nickname: name,
            imgUrl: selectedImg || profileImg,
          }),
        });

        if(!response.ok) throw new Error("프로필 변경 실패");

        setHideButton(true);
        setIsNicknameError(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } catch(error) {
        console.error(error);
      }
    };

    return (
      <TopBarBottomButtonLayout 
        onNext={handleNextClick} 
        nextLabel="완료"
        // 닉네임이 비어있으면 비활성화시킴
        nextDisabled={name.trim() === ""}
        hideButton={hideButton}   
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
            <Toast/>
          </Box>
        )}
        <Box 
          className="content"
          flex="1"              
          width="100%" 
          maxW="35rem" 
          mx="auto"
        >
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
                style={{ objectFit: 'cover' }}
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
        {!isLogin && <LoginModal onClose={() => {setIsLogin(false); router.push('/my-page');}} />}
      </TopBarBottomButtonLayout>
    )
}