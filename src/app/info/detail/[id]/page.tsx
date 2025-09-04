'use client'; 

import { useParams } from 'next/navigation';
import React, {useState, useEffect, useRef} from 'react'
import { Box, Text } from "@chakra-ui/react";
import { MobileLayout } from "../../../../components/Layouts/MobileLayout";
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';
import { ExternalLink } from "@mynaui/icons-react";
import { Bookmark } from "@mynaui/icons-react";
import { BookmarkSolid } from "@mynaui/icons-react";
import { FunnyCircleSolid } from "@mynaui/icons-react";
import { testData3 } from '../../testData';
import Image from 'next/image'
import Loading from '@/app/loading';

const TopRightIcons = ({ onKakaoShare, isBookMark, onToggleBookmark }: { 
  onKakaoShare: () => void;
  isBookMark: boolean;
  onToggleBookmark: () => void;
}) => (
    <div style={{display:"flex", gap: 16}}>
      <ExternalLink onClick={onKakaoShare} cursor='pointer'/>
      {isBookMark ? (
         <BookmarkSolid onClick={onToggleBookmark} cursor="pointer" />
      ): (
         <Bookmark onClick={onToggleBookmark} cursor="pointer" />
      )}
    </div>
);

const InfoDetail = () => {
    // URL의 id 받기 
    const { id } = useParams();
    const [detail, setDetail] = useState<any|null>(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      fetch(`http://43.200.249.9:8080/api/v1/news/${id}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      })
      .then(response => response.json())
      .then(data => {
        setDetail(data.data);
      })
      .catch((error) =>  {
        console.error('상세 조회 실패:', error);
      })
    })

    // SDK 초기화
    useEffect(() => {
        if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
        }
      }, []);

    // 공유하기 함수
    const handleShare = () => {
        if (!window.Kakao) {
          alert("카카오 SDK가 로드되지 않음");
          return;
        }
        if (!window.Kakao.Share) {
          alert("카카오 Share 모듈이 준비되지 않음");
          return;
        }
      
        window.Kakao.Share.sendDefault({
            objectType: "feed",
            content: {
              title: "엄마를 위한 케어, 아이를 위한 기록 Dear Belly",
              description: "가족 기반 공유형 임신 기록 서비스",
            //   "https://myapp.vercel.app/images/shareImage.png"
              imageUrl: "http://localhost:3000/images/shareImage.png",
              link: {
                mobileWebUrl: "http://localhost:3000",
                webUrl: "http://localhost:3000",
              },
            },
            buttons: [
              {
                title: "자세히 보기",
                link: {
                  mobileWebUrl: "http://localhost:3000/info/detail",
                  webUrl: "http://localhost:3000/info/detail",
                },
              },
            ],
        });
    };

    // 본문 데이터 '\n\n' 문단 띄우기, '** ~ **' 강조 (받은 데이터 글 양식 설정) 
    const parseText = (text: string) => {
        return text.split('\n\n').map((para, i) => (
          <TextContent key={i} marginTop={i === 0 ? "0" : "-0.75rem"}>
            {para
              .split(/(\*\*[^*]+\*\*)/g)
              .map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                        <span key={`b-${j}`} style={{ fontWeight: '800', fontSize: '0.875rem', color: 'var(--Text-Text-1, #202020)', lineHeight: '1.125rem', letterSpacing: '-0.0175rem'}}>
                          {part.slice(2, -2)}
                        </span>
                    );
                }

                // 문단 띄우기 ( 첫 번째 문단에서는 위로 띄우는거 없앰) 
                return part.split('\n').map((line, k, arr) => (
                  <React.Fragment key={`${j}-${k}`}>
                    {line}
                    {i !== 0 && <br />}
                  </React.Fragment>
                ));
              })}
          </TextContent>
        ));
    };

    // 이미지 영역보다 스크롤을 아래로 내릴 경우, topbar의 색이 transparent -> filled로 바뀌도록 수정
    const [topbarBG, setTopbarBG] = useState<'transparent' | 'filled'>('transparent');
    const imageRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const imageHeight = imageRef.current?.offsetHeight ?? 200;

            setTopbarBG(scrollY > imageHeight ? 'filled' : 'transparent');
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 북마크가 되어 있는지 아닌지 판별
    const [isBookMark, setIsBookMark] = useState(false);

    // 북마크 토글 함수
    const handleToggleBookmark = () => {
      setIsBookMark((prev) => !prev);
    };

    if (!detail) {
      return <Loading />;
    }
    
    return (
      <MobileLayout 
          topbarMode='back'
          topbarBackground={topbarBG}
          topbarContent={
            <TopRightIcons 
              onKakaoShare={handleShare}
              isBookMark={isBookMark}
              onToggleBookmark={handleToggleBookmark}
            />
          }
          hasTopPadding={false}
          showButtomNav={false}
      >
        <Box className='wrapper1' display="flex" flexDirection="column" alignItems="center">
            {/* 이미지 영역 */}
            <ImageWrapper>
              <Box w='100vw' maxH='18rem' overflow='hidden'>
                {detail && (
                  <Image
                    src={detail.imageUrl || "/images/default_image.svg"}
                    alt="대표 이미지"
                    width={800} 
                    height={500}
                    style={{
                      width: '100vw',
                      height: 'auto',
                      maxHeight: '18rem',
                      objectFit: 'cover',
                    }}
                    priority
                  />
                )}
              </Box>
            </ImageWrapper>

            {/* 이미지 영역 아래 글 영역 + 추천 글 목록 영역 */}
            <Box 
              className='wrapper2' 
              display='flex' 
              flexDirection='column'
              alignItems='center' 
              justifyContent='center'
              width='100%'
            >
                {/* 글 제목 영역 */}
                <Box className='title_wrapper' width='calc(100vw - 2.5rem)' marginTop='4vh'>
                    <TextTitle>{detail.title}</TextTitle>
                    <TextSubTitle>{detail.subTitle}</TextSubTitle>
                    <TextDate>{detail.link}</TextDate>
                </Box>

                {/* 글 내용 영역 */}
                <Box className='content_wrapper' width='calc(100vw - 2.5rem)' marginTop='3vh'>
                    <TextContent>{parseText(detail.content)}</TextContent> 
                </Box>

                {/* 추천 글 목록 영역 */}
                <Box className='recommend_wrapper' marginTop='5vh' marginBottom='3vh'>
                    <Box className='title' display='flex' alignItems="center" gap='0.5rem'>
                        <FunnyCircleSolid color='#FF6257'/>
                        <RecommendText >이런 콘텐츠는 어때요?</RecommendText>
                    </Box>
                    <Box className='content'>
                        <ContendCardOutput cards={testData3}/>
                    </Box>
                </Box>
            </Box>
        </Box>
      </MobileLayout>
    );
}

const ImageWrapper = ({ children }: { children: React.ReactNode }) => (
    <Box
      position="relative"
      width="100vw"
      margin="0 -1.5rem"   
    >
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="5.5rem"
        zIndex={1}
        background="linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0))"
      />
    </Box>
  );


const TextTitle = ({ children }: { children: React.ReactNode }) => (
    <Text
        textStyle="head_188001"
        alignSelf="stretch"
    >
        {children}
    </Text>
)

const TextSubTitle = ({ children }: { children: React.ReactNode }) => (
    <Text
        color="text.text2"
        textStyle="body_14700120"
        alignSelf="stretch"
        marginTop='1vh'
    >
        {children}
    </Text>
)

const TextDate = ({ children }: { children: React.ReactNode }) => (
    <Text
        color="text.text3"
        textStyle="caption_107001"
        marginTop='1.5vh'
    >
        {children}
    </Text>
)

const TextContent = ({ children, marginTop }: { children: React.ReactNode, marginTop?:string }) => (
    <Text
        as="div" 
        mt={marginTop}
        color="text.text2"
        textStyle="body_14400224"
        textAlign='justify'
        alignSelf="stretch"
        lineHeight="2rem"
    >
        {children}
    </Text>
)

const RecommendText = ({ children }: { children: React.ReactNode }) => (
    <Text
      color="text.text2"
      textStyle="body_148001"
      alignSelf="stretch"
    >
      {children}
    </Text>
)

export default InfoDetail