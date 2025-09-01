'use client';

import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation';
import { Box, Text } from "@chakra-ui/react";
import { MobileLayout } from "../../components/Layouts/MobileLayout";
import { Search } from "@mynaui/icons-react";
import { FunnyCircleSolid } from "@mynaui/icons-react";
import { NoticeCardCarousel } from '@/components/NoticeComponent/NoticeCardCarousel';
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';
import { InlineCard } from '@/components/InlineCard/InlineCard';
import { HeroCard } from '@/components/HeroCard/HeroCard';
import { FunnySquareSolid } from "@mynaui/icons-react";
import { ChevronRight } from "@mynaui/icons-react";
import { testData, testData2, testData3 } from './testData';

// 탑바에 보낼 데이터터
const TopRightIcons = () => {
  const router = useRouter();
  const handleSearchInventoryClick = () => {
    router.push('/info/search');
  };

  return (
    <div style={{display:"flex", gap: 16, cursor: 'pointer'}}>
      <Search onClick={handleSearchInventoryClick}/>
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

  return (
    <MobileLayout topbarContent={<TopRightIcons/>}>
      <Box className='wrapper' display="flex" flexDirection="column" alignItems="center" margin='1rem 0'>
        {/* 히어로 카드 영역 */}
        <Box className='hero_card'>
          <HeroCard {...randomHeroCard} />
        </Box>

        {/* 공지 카드 영역 */}
        <Box className='notice_card' mt='1.5vh' width="calc(100vw - 2.5rem)">
          <NoticeCardCarousel cards={testData2} />
        </Box>

        {/* 추천 글 목록 영역 */}
        <Box className='recommend_wrapper' mt='5vh'>
          <Box className='title' display='flex' alignItems="center" gap='0.5rem'>
            <FunnyCircleSolid color='#FF6257'/>
            <RecommendText >당신을 위한 추천</RecommendText>
          </Box>
          <Box className='content'>
            <ContendCardOutput cards={testData3}/>
          </Box>
        </Box>

        {/* 새로운 기능 홍보하는 카드 영역 */}
        <Box className='inlinecard_wrapper' height='6rem' mt='3.704vh'>
          <InlineCard
            imageDescription="기본 이미지"
            description="다른 기능들을 사용하도록 유도하는 메세지를 적어요."
            shortcutLink="자세히 보기"
            shortcutHref="/guide/folic"
          />
        </Box>

        {/* 전체 글 목록 영역 */}
        <Box className='recommend_wrapper' mt='3.704vh' mb='3.704vh'>
          <Box className='title' display='flex' alignItems="center" gap='0.5rem'>
            <FunnySquareSolid  color='#FF6257'/>
            <RecommendText>알아두면 좋은 정보 모음집</RecommendText>
            <Box 
              marginLeft="auto" 
              width="1.25rem" 
              height="100%" 
              display="flex" 
              alignItems="center"
              cursor="pointer"
            >
              <ChevronRight color='#6C6B6B' onClick={handleInventoryClick}/>
            </Box>
          </Box>
          <Box className='content'>
            <ContendCardOutput cards={testData3}/>
          </Box>
        </Box>

      </Box>
    </MobileLayout>
  ) 
}

export const RecommendText = ({ children }: { children: React.ReactNode }) => (
  <Text
    as="span"
    color="var(--Text-Text-2, #6C6B6B)"
    fontFamily="NanumSquare Neo"
    fontSize="0.875rem"
    fontStyle="normal"
    fontWeight={600}
    lineHeight="1.25rem"
    letterSpacing="-0.00875rem"
  >
    {children}
  </Text>
);