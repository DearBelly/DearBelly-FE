'use client';

import React, { useMemo, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation';
import { Box, Text } from "@chakra-ui/react";
import { MobileLayout } from "../../components/Layouts/MobileLayout";
import { NoticeCardCarousel } from '@/components/NoticeComponent/NoticeCardCarousel';
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';
import { InlineCard } from '@/components/InlineCard/InlineCard';
import { HeroCard } from '@/components/HeroCard/HeroCard';
import { testData, testData2, testData3 } from './testData';
import { ChakraIcons } from "@/lib/withChakraIcon";

// 탑바에 보낼 데이터
const TopRightIcons = () => {
  const router = useRouter();
  const handleSearchInventoryClick = () => {
    router.push('/info/search');
  };

  return (
    <div style={{display:"flex", gap: 16, cursor: 'pointer'}}>
      <ChakraIcons.Search onClick={handleSearchInventoryClick} color='icon.icon3'/>
    </div>
  );
};

export default function Information() {
  const router = useRouter();
  const handleInventoryClick = () => {
    router.push('/info/category');
  };

  // 랜덤 히어로 카드 1개 뽑기
  const randomHeroCard = useMemo(() => {
    const index = Math.floor(Math.random() * testData.length);
    return testData[index];
  },[]);

  // 전체 정보 카드 데이터 저장
  const [contentCard, setContentCard] = useState<any[]>([]);
  // 추천 정보 카드 데이터 저장
  const [recommendCard, setRecommendCard] = useState<any[]>([]);

  // 전체 정보 카드 불러오기 
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news/category`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    })
    .then(response => response.json())
    .then((data) => {
      if(data.success && Array.isArray(data.data))  {
        const formatted = data.data.map((item: any) => ({
          id: item.newsId,
          title: item.title,
          subTitle: item.subTitle,
          imageSrc:  item.imageUrl || "/images/default_image.svg",
          category: item.category,
          bookmark: item.bookmarked || false,
        }));
        setContentCard(formatted);
      }
    })
    .catch((error) => {
      console.error('백엔드 요청 실패:', error);
    });
  }, []);

    // 추천 정보 카드 불러오기 api 연동
    useEffect(() => {
      const token = localStorage.getItem('token');
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      })
      .then(response => response.json())
      .then((data) => {
        if(data.success && Array.isArray(data.data))  {
          const formatted = data.data.map((item: any) => ({
            id: item.newsId,
            title: item.title,
            subTitle: item.subTitle,
            imageSrc:  item.imageUrl || "/images/default_image.svg",
            category: item.category,
            bookmark: item.bookmarked || false,
          }));
          setRecommendCard(formatted);
        }
      })
      .catch((error) => {
        console.error('백엔드 요청 실패:', error);
      });
    }, []);

  return (
    <MobileLayout topbarContent={<TopRightIcons/>}>
      <Box className='wrapper' display="flex" flexDirection="column" alignItems="center" mt="1rem">
        {/* 히어로 카드 영역 */}
        <Box className='hero_card'>
          <HeroCard {...randomHeroCard} />
        </Box>

        {/* 공지 카드 영역 */}
        <Box className='notice_card' mt='1.5vh' width="calc(100vw - 2.5rem)" maxW="35rem">
          <NoticeCardCarousel cards={testData2} />
        </Box>

        {/* 추천 글 목록 영역 */}
        <Box className='recommend_wrapper' mt='5vh' width="calc(100vw - 2.5rem)" maxW="35rem">
          <Box className='title' display='flex' alignItems="center" gap='0.5rem'>
            <ChakraIcons.FunnyCircleSolid color='icon.iconPrimary'/>
            <RecommendText>당신을 위한 추천</RecommendText>
          </Box>
          <Box className='content'>
            <ContendCardOutput cards={recommendCard.length > 0 ? recommendCard : testData3}/>
          </Box>
        </Box>

        {/* 새로운 기능 홍보하는 카드 영역 */}
        <Box className='inlinecard_wrapper' height='6rem' mt='3.704vh' width="calc(100vw - 2.5rem)" maxW="35rem">
          <InlineCard
            imageSrc='/images/information/letter.png'
            imageDescription="기본 이미지"
            description="소중한 아이에게서 도착한 편지에 답장을 작성해 보세요"
            shortcutLink="자세히 보기"
            shortcutHref="/letters" 
          />
        </Box>

        {/* 전체 글 목록 영역 */}
        <Box className='recommend_wrapper' mt='3.704vh' mb='3.704vh' width="calc(100vw - 2.5rem)" maxW="35rem">
          <Box className='title' display='flex' alignItems="center" gap='0.5rem'>
            <ChakraIcons.FunnySquareSolid  color='icon.iconPrimary'/>
            <RecommendText>알아두면 좋은 정보 모음집</RecommendText>
            <Box 
              marginLeft="auto" 
              width="1.25rem" 
              height="100%" 
              display="flex" 
              alignItems="center"
              cursor="pointer"
            >
              <ChakraIcons.ChevronRight color='icon.icon2' onClick={handleInventoryClick}/>
            </Box>
          </Box>
          <Box className='content'>
            <ContendCardOutput cards={contentCard.length > 0 ? contentCard : testData3}/>
          </Box>
        </Box>

      </Box>
    </MobileLayout>
  ) 
}

const RecommendText = ({ children }: { children: ReactNode }) => (
  <Text
    color="text.text2"
    textStyle="body_148001"
  >
    {children}
  </Text>
)