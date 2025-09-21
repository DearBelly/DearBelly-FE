'use client';

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';
import { LoginModal } from '@/components/LoginModal/LoginModal';
import type { ContendCardProps } from '@/components/ContentCard/ContentCard';
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export default function BookMark() {
    const router = useRouter();
    
    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);
    const [cards, setCards] = useState<ContendCardProps[]>([]);
    const { token } = useUserStore();


    // 토큰 체크
    useEffect(() => {
        if(token) {
            setIsLogin(true);

            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news/bookmarks?page=0&size=20`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                },
            })
            .then((res)=> res.json())
            .then((data) => {
                console.log("북마크 데이터: ", data);
                if(data?.data?.content) {
                    const mappedCards: ContendCardProps[] = data.data.content.map((item: any)=> ({
                        id: item.newsId,                        // 상세 페이지 이동에 사용할 ID
                        title: item.title || "제목 없음",
                        description: item.subTitle  || "내용 없음",
                        imageSrc: item.imageUrl,     
                    }));
                    setCards(mappedCards);
                }
            })
            .catch((err) => console.error("북마크 불러오기 실패: ", err));
        }else {
            setIsLogin(false);
        }
    }, []);

    const content_mobile = (
        <Box 
            className='body_wrapper' 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            mt='0.62rem' 
            mb='0.62rem'
            width='calc(100vw - 2.5rem)'
            maxW='35rem'
            mx='auto'
        >
            {isLogin ? <ContendCardOutput cards={cards}/> : <LoginModal onClose={() => {setIsLogin(false); router.push('/my-page');}} />}
        </Box>
    );
    
    return (
        <MobileLayout
            topbarMode='back'
            topbarTitle='북마크 모음'
            topbarBackground='filled'
        >
            {content_mobile}
        </MobileLayout>
    )
}