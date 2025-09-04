'use client';

import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { useRouter } from "next/navigation";
import { RadioField } from '@/components/RadioField/RadioField';
import { InputBox } from "@/components/TextField/InputBox";
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function BabyEdit() {
    const router = useRouter();
    const handleClick = () => {
      router.push(`/mypage/babyInfo`);
    };

    const [selected, setSelected] = useState(0);
    const options = ['여자', '남자', '미정'];

    const [nickname, setNickname] = useState("");
    const [isNicknameError, setIsNicknameError] = useState(false);

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
    
        setIsNicknameError(false);
        handleClick();
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
            nextLabel="완료"
            topbarTitle='태아 정보'
            nextDisabled={nickname.trim() === ""}
            onNext={handleNextClick} 
        >
            <Box 
                className="wrapper"
                display="flex" 
                flexDirection="column" 
                padding="0.75rem 0.5rem"
                borderRadius= '0.75rem'
                background= 'bg.bg3'     
                mt='2.5rem'       
            >
                <InputBox
                    mode="transparent"
                    title="태아명"
                    placeholder='태아의 이름을 입력해주세요'
                    onChange={handleNicknameChange}
                    isError={isNicknameError}
                    errorMessage="닉네임을 설정해주세요"
                />

                <Box className='gender_wrapper' ml="1rem" mt='0.75rem' mb='0.75rem'>
                    <Text textStyle="caption_12700" mb="0.25rem">
                        성별
                    </Text>
                    <Box gap='4vw' display='flex'>
                        {options.map((label, idx) => (
                            <RadioField
                                key={idx}
                                label={label}
                                checked={selected === idx}
                                onClick={() => setSelected(idx)}
                            />
                        ))}
                    </Box>
                </Box>
                {!isLogin && <LoginModal/>}
            </Box>
        </TopBarBottomButtonLayout>
    );
}