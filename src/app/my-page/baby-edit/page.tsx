'use client';

import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { RadioField } from '@/components/RadioField/RadioField';
import { InputBox } from "@/components/TextField/InputBox";
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function BabyEdit() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const babyId = searchParams.get("id");
    
    const options = ['여성', '남성', '미정'];
    const genderMap = ["FEMALE", "MALE", "UNKNOWN"];

    const [selected, setSelected] = useState(2);
    const [nickname, setNickname] = useState("");
    const [isNicknameError, setIsNicknameError] = useState(false);
    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState<boolean | null>(null);

    // 토큰 체크
    useEffect(() => {
        if (typeof window === "undefined") return;
        const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_TEMP_TOKEN;
        setIsLogin(!!token);
        if(!babyId || !token) return;

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/baby/${babyId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        })
        .then((response) => response.json())
        .then((json) => {
            if(json?.data) {
                setNickname(json.data.name || "");
                const gender = json.data.babyGender;
                if(gender === "FEMALE") setSelected(0);
                else if(gender === "MALE") setSelected(1);
            }
        })
        .catch((err) => console.log("아기 정보 불러오기 실패: ", err));
    }, [babyId]);


    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 10) {
          setNickname(value);
          if (value.trim() !== "") {
            setIsNicknameError(false);
          }
        }
    };

    // 수정한 아기 정보 저장 
    const handleNextClick = async () => {
        if (nickname.trim() === "") {
          setIsNicknameError(true);
          return;
        }
        setIsNicknameError(false);
        
        const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_TEMP_TOKEN;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/baby/${babyId}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    babyId: Number(babyId),
                    name: nickname,
                    babyGender: genderMap[selected],
                }),
            });

            if(!response.ok) throw new Error("아기 정보 수정 실패");

            const json = await response.json();
            console.log("수정 성공: ", json);

            router.push('/my-page/baby-info');
        }catch(err){
            console.log("아기 정보 수정 오류: ", err);
        }
    };

    const handleBackClick = () => {
        router.push("/my-page/baby-info");
    };

    return (
        <TopBarBottomButtonLayout 
            nextLabel="완료"
            topbarTitle='태아 정보'
            nextDisabled={nickname.trim() === ""}
            onNext={handleNextClick} 
            onBack={handleBackClick}
        >
            {isLogin === false && <LoginModal onClose={() => { setIsLogin(false); router.push('/my-page'); }} />}
            <Box 
                className="wrapper"
                display="flex" 
                flexDirection="column" 
                padding="0.75rem 0.5rem"
                borderRadius= '0.75rem'
                background= 'bg.bg3'  
                width="100%"  
                maxW="33.75rem" 
                mt='2.5rem'       
                mx="auto" 
            >
                <InputBox
                    mode="transparent"
                    title="태아명"
                    placeholder="태아명을 입력해주세요"
                    value={nickname}
                    onChange={handleNicknameChange}
                    isError={isNicknameError}
                    errorMessage="태아명을 설정해주세요"
                />

                <Box className='gender_wrapper' ml="1rem" mt='0.75rem' mb='0.75rem'>
                    <Text textStyle="caption_12800" color="text.text1" mb="0.5rem">
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
            </Box>
        </TopBarBottomButtonLayout>
    );
}