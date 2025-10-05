'use client'; 

import { useParams } from 'next/navigation';
import React, {useState, useEffect, useRef} from 'react'
import { Box, Text, Link } from "@chakra-ui/react";
import { MobileLayout } from "../../../../components/Layouts/MobileLayout";
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';
import Image from 'next/image'
import Loading from '@/app/loading';
import { ChakraIcons } from "@/utils/withChakraIcon";
import { LoginModal } from '@/components/LoginModal/LoginModal';
import { useRouter } from "next/navigation";

const TopRightIcons = ({ onKakaoShare, isBookMark, onToggleBookmark }: { 
  onKakaoShare: () => void;
  isBookMark: boolean;
  onToggleBookmark: () => void;
}) => (
    <div style={{display:"flex", gap: 16}}>
      <ChakraIcons.ExternalLink onClick={onKakaoShare} cursor='pointer' color='icon.icon1'/>
      {isBookMark ? (
         <ChakraIcons.BookmarkSolid onClick={onToggleBookmark} cursor="pointer" color='icon.icon1'/>
      ): (
         <ChakraIcons.Bookmark onClick={onToggleBookmark} cursor="pointer" color='icon.icon1'/>
      )}
    </div>
);

const InfoDetail = () => {
    const router = useRouter();

    // URL의 id 받기 
    const { id } = useParams();
    const [detail, setDetail] = useState<any|null>(null);
    // 추천 정보 카드 데이터 저장
    const [recommendCard, setRecommendCard] = useState<any[]>([]);
    // 북마크 상태관리
    const [isBookMark, setIsBookMark] = useState(false);
    // 로그인 여부 상태관리 
    const [isLogin, setIsLogin] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    // 토큰 체크
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);
    }, []);

    // 북마크 토글 함수
    const handleToggleBookmark = async() => {
      const token = localStorage.getItem('token');
      
      if (!isLogin || !token) {
        // 로그인 안 되어 있으면 북마크 대신 모달 띄우기
        setShowLoginModal(true);
        return;
      }

      try {
        // 북마크가 선택되어 있을 경우 클릭하면 북마크 삭제제
        if(isBookMark) {
          await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news/${id}/bookmark`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
          setIsBookMark(false);
        } else {
          // 북마크가 선택되어 있지 않을 경우 클리하면 북마크 등록 
          await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news/${id}/bookmark`, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
          setIsBookMark(true);
        }
      } catch (error) {
        console.error("북마크 토글 실패함: ", error);
      }
    };

    // 정보 카드 디테일 불러오기 api 연동
    useEffect(() => {
      const token = localStorage.getItem('token');
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news/${id}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      })
      .then(response => response.json())
      .then(data => {
        setDetail(data.data);
        setIsBookMark(data.data.bookmarked)
      })
      .catch((error) =>  {
        console.error('상세 조회 실패:', error);
      })
    },[id]);

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

    // SDK 초기화
    useEffect(() => {
        if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
        }
      }, []);

    // 카톡 공유하기 함수
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
            title: detail.title,
            description: detail.subTitle,
            imageUrl: `${process.env.NEXT_PUBLIC_URL}/images/shareImage.png`,
            imageWidth: 800,   
            imageHeight: 400,
            link: {
              mobileWebUrl: `${process.env.NEXT_PUBLIC_URL}`,
              webUrl: `${process.env.NEXT_PUBLIC_URL}`,
            },
          },
          buttons: [
            {
              title: "자세히 보기",
              link: {
                mobileWebUrl: `${process.env.NEXT_PUBLIC_URL}/info/detail/${id}`,
                webUrl: `${process.env.NEXT_PUBLIC_URL}/info/detail/${id}`,
              },
            },
          ],
        });
    };

    // 본문 데이터 '\n\n' 문단 띄우기, '### 제목' 강조 + '**' 볼드 처리
    const parseText = (text: string) => {
      return text.split('\n\n').map((para, i) => {
        // #, ## 제목 처리
        if (/^#{1,2}\s/.test(para)) {
          const title = para.replace(/^#{1,2}\s*/, "").trim(); 
          return (
            <Text
              key={`title-${i}`}
              textStyle="body_168002"   
              color="text.text1"
              mt={i === 0 ? "0" : "1rem"}
              mb="0.5rem"
            >
              {title}
            </Text>
          );
        }

        return (
          <TextContent key={i} marginTop={i === 0 ? "0" : "1rem"}>
            {para.split('\n').map((line, k, arr) => {
              // ** 강조 처리
              if (/^\*\*/.test(line)) {
                const boldLine = line.replace(/^\*\*/, "").trim();
                return (
                  <Text as="span" key={`${i}-${k}`} fontWeight="bold">
                    {boldLine}
                    {k !== arr.length - 1 && <br />}
                  </Text>
                );
              }

              return (
                <React.Fragment key={`${i}-${k}`}>
                  {line}
                  {k !== arr.length - 1 && <br />}
                </React.Fragment>
              );
            })}
          </TextContent>
        );
      });
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
        {showLoginModal  && <LoginModal onClose={() => {setShowLoginModal(false); router.push(`/info/detail/${id}`);}} />} 

        <Box className='wrapper1' display="flex" flexDirection="column" alignItems="center">
            {/* 이미지 영역 */}
            <ImageWrapper>
              <Box overflow='hidden'>
                {detail && (
                  <Image
                    src={detail.imageUrl || "/images/default_image.svg"}
                    alt="대표 이미지"
                    width={800}
                    height={500}
                    style={{
                      width: '100vw',        
                      maxWidth: '40rem',     
                      height: 'auto',       
                      maxHeight: '17rem', 
                      objectFit: 'cover',    
                      objectPosition: 'top', 
                      margin: '0 auto',
                      display: 'block',
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
              width='calc(100vw - 2.5rem)'
              maxW='35rem'
            >
                {/* 글 제목 영역 */}
                <Box className='title_wrapper' width='100%'  marginTop='4vh'>
                    <TextTitle>{detail.title}</TextTitle>
                    <TextSubTitle>{detail.subTitle}</TextSubTitle>
                    {detail.link && <TextLink href={detail.link}>{detail.link}</TextLink>}
                </Box>

                {/* 글 내용 영역 */}
                <Box className='content_wrapper' width='100%' margin='5vh 0'>
                    <TextContent>{parseText(detail.content)}</TextContent> 
                </Box>

                {/* 추천 글 목록 영역 */}
                <Box className='recommend_wrapper' marginTop='5vh' marginBottom='3vh' width='100%'>
                    <Box className='title' display='flex' alignItems="center" gap='0.5rem'>
                        <ChakraIcons.FunnyCircleSolid color='icon.iconPrimary'/>
                        <RecommendText >이런 콘텐츠는 어때요?</RecommendText>
                    </Box>
                    <Box className='content'>
                        <ContendCardOutput cards={recommendCard}/>
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
      maxW="40rem"
      margin="0 calc(-1.25rem)"  
      display="flex"
      justifyContent="center"
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
        background="linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))"
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

const TextLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      color="blue.400"
      textStyle="caption_107001"
      marginTop="1.5vh"
      cursor="pointer"
    >
      {children}
    </Link>
);

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
    >
      {children}
    </Text>
)

export default InfoDetail