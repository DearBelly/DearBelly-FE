"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { Box, Text } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../../context/BreakPointProvider";
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

export default function Information() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const router = useRouter();

  
  const handleSearchClick = () => {
    router.push('/info/search');
  };

  const handleInventoryClick = () => {
    router.push('/info/category');
  };

  // 랜덤 히어로 카드 1개 뽑기 클라이언트에서만 실행하도록 수정
  const [randomHeroCard, setRandomHeroCard] = useState<typeof testData[0] | null>(null);

  useEffect(() => {
    const index = Math.floor(Math.random() * testData.length);
    setRandomHeroCard(testData[index]);
  }, []);

  const content_mobile = (
    <Box className='wrapper' display="flex" flexDirection="column" alignItems="center">
      {/* 히어로 카드 영역 */}
      {randomHeroCard && (
        <Box className='hero_card'>
          <HeroCard {...randomHeroCard} />
        </Box>
      )}

      {/* 공지 카드 영역 */}
      <Box className='notice_card' mt='1.5vh'>
        <NoticeCardCarousel cards={testData2} />
      </Box>

      {/* 추천 글 목록 영역 */}
      <Box className='recommend_wrapper' mt='5vh' width='21rem'>
        <Box className='title' display='flex' alignItems="center" gap='0.5rem'>
          <FunnyCircleSolid color='#FF6257'/>
          <RecommendText >당신을 위한 추천</RecommendText>
        </Box>
        <Box className='content'>
          <ContendCardOutput cards={testData3}/>
        </Box>
      </Box>

      {/* 새로운 기능 홍보하는 카드 영역 */}
      <Box className='inlinecard_wrapper' width='21rem' height='6rem' mt='3.704vh'>
        <InlineCard
          imageDescription="기본 이미지"
          description="다른 기능들을 사용하도록 유도하는 메세지를 적어요."
          shortcutLink="자세히 보기"
          shortcutHref="/guide/folic"
        />
      </Box>

      {/* 전체 글 목록 영역 */}
      <Box className='recommend_wrapper' mt='3.704vh' mb='3.704vh' width='21rem'>
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
  );

  return isMobile ? (
    <MobileLayout topBarProps={{firstIcon: <Search onClick={handleSearchClick} style={{ cursor: 'pointer' }}/>}}>
      {content_mobile}
    </MobileLayout>
  ) : (
    <MobileLayout topBarProps={{firstIcon: <Search onClick={handleSearchClick} style={{ cursor: 'pointer' }}/>}}>
      {content_mobile}
    </MobileLayout>
  );
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