'use client';

import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { ProfileListOutput } from '@/components/ProfileList/ProfileListOutput';
import { useRouter } from "next/navigation";
import { LoginModal } from '@/components/LoginModal/LoginModal';
import type { ProfileListProps } from '@/components/ProfileList/ProfileList';

//  성별에 맞는 이미지 넣어줌
const genderImageMap: Record<string, string> = {
    FEMALE: '/images/babyInfo/female.svg',
    MALE: '/images/babyInfo/male.svg',
    UNKNOWN: '/images/babyInfo/none.svg',
};

export default function BabyInfo() {
    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);
    const [cards, setCards] = useState<ProfileListProps[]>([]);

    // 저장된 아이 목록 불러옴 
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setIsLogin(false);
            return;
        }

        setIsLogin(true);

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/baby`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
        })
          .then(response => response.json())
          .then(data => {
            console.log("백엔드 응답 JSON:", data);
            
            if(data?.data) {
                const mapped = data.data.map((baby: any) => ({
                    id: baby.babyId,
                    name: baby.name,
                    mode: 'transparent',
                    isDot: true,
                    babyGender: baby.babyGender,
                    profileSrc: genderImageMap[baby.babyGender] || '/images/babyInfo/none.svg',
                    dueDateCalculated: baby.dueDateCalculated,  
                })) as ProfileListProps[];

                setCards(mapped);
            }
          })
          .catch((error) => {
            console.error('아이 목록 조회 실패:', error);
          })
    }, []);

    const router = useRouter();
    const handleBabyAddClick = () => {
      router.push("/my-page/baby-add");
    };

    const pregnantDate=cards.length > 0 ? cards[0].dueDateCalculated : '등록된 아기 없음';

    return (
        <TopBarBottomButtonLayout 
            nextLabel="추가하기"
            topbarTitle='태아 정보'
            nextDisabled={false}
            onNext={handleBabyAddClick}
        >
            <Box className='body_wrapper' w='100%' display="flex" flexDirection="column" alignItems="center" mt='0.62rem'>
                <Box w='100%' maxW='35rem' mx='auto'>
                    <Box 
                        className='text_wrapper'
                        color="text.text1"
                        textStyle="body_12700"
                        mb='1rem'                 
                        textAlign='right'
                        mr='0.5rem'
                    >
                        <Text>출산예정일 : {pregnantDate || '정보 없음'}</Text>
                    </Box>
                    <ProfileListOutput cards={cards} onDelete={(id) => {
                        setCards((prev) => prev.filter((c) => c.id !== id));
                    }}/>
                </Box>
                {!isLogin && <LoginModal />}
            </Box>
        </TopBarBottomButtonLayout>
    );
}