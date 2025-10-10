'use client'; 

import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Link, chakra } from "@chakra-ui/react";
import { MobileLayout } from "../../../../components/Layouts/MobileLayout";
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';
import Image from 'next/image';
import Loading from '@/app/loading';
import { ChakraIcons } from "@/lib/withChakraIcon";
import { LoginModal } from '@/components/LoginModal/LoginModal';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const TopRightIcons = ({ onKakaoShare, isBookMark, onToggleBookmark }: { 
  onKakaoShare: () => void;
  isBookMark: boolean;
  onToggleBookmark: () => void;
}) => (
  <div style={{ display: "flex", gap: 16 }}>
    <ChakraIcons.ExternalLink onClick={onKakaoShare} cursor='pointer' color='icon.icon1' />
    {isBookMark ? (
      <ChakraIcons.BookmarkSolid onClick={onToggleBookmark} cursor="pointer" color='icon.icon1' />
    ) : (
      <ChakraIcons.Bookmark onClick={onToggleBookmark} cursor="pointer" color='icon.icon1' />
    )}
  </div>
);

const InfoDetail = () => {
  const router = useRouter();
  const { id } = useParams();

  const [detail, setDetail] = useState<any | null>(null);
  const [recommendCard, setRecommendCard] = useState<any[]>([]);
  const [isBookMark, setIsBookMark] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  }, []);

  const handleToggleBookmark = async () => {
    const token = localStorage.getItem('token');
    if (!isLogin || !token) {
      setShowLoginModal(true);
      return;
    }

    try {
      const method = isBookMark ? "DELETE" : "PUT";
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news/${id}/bookmark`, {
        method,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setIsBookMark(!isBookMark);
    } catch (error) {
      console.error("북마크 토글 실패:", error);
    }
  };

  // 상세 조회
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
        setIsBookMark(data.data.bookmarked);
      })
      .catch((error) => console.error('상세 조회 실패:', error));
  }, [id]);

  // 추천 정보 조회
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
        if (data.success && Array.isArray(data.data)) {
          const formatted = data.data.map((item: any) => ({
            id: item.newsId,
            title: item.title,
            subTitle: item.subTitle,
            imageSrc: item.imageUrl || "/images/default_image.svg",
            category: item.category,
            bookmark: item.bookmarked || false,
          }));
          setRecommendCard(formatted);
        }
      })
      .catch((error) => console.error('백엔드 요청 실패:', error));
  }, []);

  // 카카오 SDK 초기화
  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  const handleShare = () => {
    if (!window.Kakao || !window.Kakao.Share) {
      alert("카카오 SDK가 준비되지 않았습니다.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: detail.title,
        description: detail.subTitle,
        imageUrl: `${process.env.NEXT_PUBLIC_URL}/images/shareImage.png`,
        link: {
          mobileWebUrl: `${process.env.NEXT_PUBLIC_URL}/info/detail/${id}`,
          webUrl: `${process.env.NEXT_PUBLIC_URL}/info/detail/${id}`,
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

  // 스크롤 시 topbar 배경 변경
  const [topbarBG, setTopbarBG] = useState<'transparent' | 'filled'>('transparent');
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const imageHeight = imageRef.current?.offsetHeight ?? 200;
      setTopbarBG(scrollY > imageHeight ? 'filled' : 'transparent');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!detail) return <Loading />;

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
      {showLoginModal && (
        <LoginModal
          onClose={() => {
            setShowLoginModal(false);
            router.push(`/info/detail/${id}`);
          }}
        />
      )}

      <Box display="flex" flexDirection="column" alignItems="center">
        {/* 이미지 */}
        <ImageWrapper ref={imageRef}>
          <Box overflow="hidden">
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
          </Box>
        </ImageWrapper>

        {/* 본문 영역 */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="calc(100vw - 2.5rem)"
          maxW="35rem"
        >
          <Box width="100%" mt="4vh">
            <TextTitle>{detail.title}</TextTitle>
            <TextSubTitle>{detail.subTitle}</TextSubTitle>
            {detail.link && <TextLink href={detail.link}>해당 글 보러가기 →</TextLink>}
          </Box>

          <Box width="100%" mt="2.5vh" mb="2.5vh">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <chakra.h1 textStyle="head_188001" color="text.text1" mt="1.5rem" mb="0.5rem" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <chakra.h2 textStyle="body_168002" color="text.text1" mt="1.2rem" mb="0.5rem" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <chakra.strong fontWeight="bold" color="text.text1" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <chakra.p textStyle="body_14400224" color="text.text2" lineHeight="2rem" mb="1rem" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <chakra.ul pl="1.5rem" mb="1rem" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <chakra.li textStyle="body_14400224" color="text.text2" lineHeight="1.8rem" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <chakra.a color="blue.400" target="_blank" rel="noopener noreferrer" {...props} />
                ),
              }}
            >
              {detail.content}
            </ReactMarkdown>
          </Box>

          {/* 추천 콘텐츠 */}
          <Box mt="5vh" mb="3vh" width="100%">
            <Box display="flex" alignItems="center" gap="0.5rem">
              <ChakraIcons.FunnyCircleSolid color='icon.iconPrimary' />
              <RecommendText>이런 콘텐츠는 어때요?</RecommendText>
            </Box>
            <Box>
              <ContendCardOutput cards={recommendCard} />
            </Box>
          </Box>
        </Box>
      </Box>
    </MobileLayout>
  );
};

const ImageWrapper = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <Box
      ref={ref}
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
  )
);

const TextTitle = ({ children }: { children: React.ReactNode }) => (
  <Text 
    color="text.text2" 
    textStyle="head_188001" 
    alignSelf="stretch"
  >
    {children}
  </Text>
);

const TextSubTitle = ({ children }: { children: React.ReactNode }) => (
  <Text 
    color="text.text2" 
    textStyle="body_14700120" 
    mt="1vh"
  >
    {children}
  </Text>
);

const TextLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    color="text.text2"
    textStyle="caption_107001"
    mt="1.5vh"
    textDecoration="underline"
    style={{
      textUnderlineOffset: "5px",   
      textDecorationColor: "currentColor",
    }}
  >
    {children}
  </Link>
);

const RecommendText = ({ children }: { children: React.ReactNode }) => (
  <Text 
    color="text.text2" 
    textStyle="body_148001"
  >
    {children}
  </Text>
);

export default InfoDetail;