'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Box, Flex, Grid, Image, Text, Skeleton } from "@chakra-ui/react";

import { MobileLayout } from "@/components/Layouts/MobileLayout";
import { NoticeCard } from "@/components/Home/NoticeCard/NoticeCard";
import { ImageCard } from "@/components/Home/ImageCard/ImageCard";
import { Button } from "@/components/Button/Button";
import ShaderBg from "@/components/Home/Background/ShaderBg";
import { ChakraIcons } from "@/utils/withChakraIcon";
import { useBackgroundStore } from "@/store/useBackgroundStore";
import { BannerInfo } from "@/types/home";
import { RecommendedInfo } from "@/types/RecommendedInfo";

import animationData from "@/assets/animation/interaction.json";

const Lottie = dynamic(() => import("@/components/Lottie/Lottie"), { ssr: false });

export default function Home() {
  const router = useRouter();
  const bgState = useBackgroundStore();

  const [bannerInfo, setBannerInfo] = useState<BannerInfo | null>(null);
  const [recommendedInfo, setRecommendedInfo] = useState<RecommendedInfo[]>([]);

  const defaultUrl = "https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.5&cAzimuthAngle=60&cDistance=7.1&cPolarAngle=90&cameraZoom=25&color1=%23ff7a33&color2=%2333a0ff&color3=%23ffc53d&destination=onCanvas&embedMode=off&envPreset=dawn&format=gif&fov=50&frameRate=10&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=-0.15&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&toggleAxis=false&type=sphere&uAmplitude=2&uDensity=1.1&uFrequency=5.5&uSpeed=0.05&uStrength=0.4&uTime=0&wireframe=false&zoomOut=false";

  const topBarIconContent = (
    <Flex gap="12px" color="icon.icon5">
      <ChakraIcons.EnvelopeSolid size={24} onClick={() => router.push("/letters")} />
      <ChakraIcons.StoreSolid size={24} onClick={() => router.push("/store")} />
    </Flex>
  );

  const getBannerInfo = async () => {
    const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/letters/top`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("배너 정보 조회 오류");

      const json = await response.json();
      setBannerInfo(json.data);
    } catch (err) {
      console.log("배너 정보 조회 오류: ", err);
    }
  };

  const getInfoRecommendation = async () => {
    const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("추천 정보 조회 오류");

      const json = await response.json();
      setRecommendedInfo(json.data || []);
    } catch (err) {
      console.log("추천 정보 조회 오류: ", err);
    }
  };

  useEffect(() => {
    getBannerInfo();
    getInfoRecommendation();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      getInfoRecommendation();
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleImageCardClick = (url: string) => {
    router.push(url);
  };

  return (
    <Flex w="100dvw" h="100dvh" justify="center" position="relative" overflow="hidden">
      {/* 배경 */}
      <ShaderBg
        urlString={bgState.backgrounds.find((bg) => bg.id === bgState.appliedId)?.urlPath || defaultUrl}
      />
      <Lottie
        animationData={animationData}
        loop={true}
        speed={0.4}
        autoplay={true}
        style={{
          width: "150rem",
          height: "150rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        }}
      />

      <Flex w="100%" maxW="40rem" m="0 auto" position="relative" overflow="hidden">
        <MobileLayout
          contentBackground="transparent"
          topbarMode="whiteLogo"
          topbarBackground="transparent"
          hasSidePadding={false}
          topbarContent={topBarIconContent}
          hasTopPadding={false}
          hasBottomPadding={false}
        >
          <Grid templateRows="auto 1fr auto" h="100%" w="100%" position="relative" zIndex={1}>
            <Box gridRow="1" w="fit-content" ml="auto" pt="3.75rem" pr="20px">
              {bannerInfo?.babyName ? (
                <NoticeCard
                  mode="default"
                  noticeText={`${bannerInfo.babyName}를 만난 지\n${bannerInfo.week}주가 되었어요!`}
                />
              ) : (
                <NoticeCard mode="button" noticeText="아기 정보를 등록해주세요" />
              )}
            </Box>

            {/* 메인 일러스트 */}
            <Flex
              gridRow="2"
              direction="column"
              align="center"
              justify="center"
              gap="20px"
              w="100%"
              my="auto"
              mx="auto"
            >
              <Image
                src="/images/letter.svg"
                alt="편지"
                h="7.5dvh"
                objectFit="contain"
                onClick={() => router.push("/letters")}
              />
              <Image
                src="/images/babyCharacter/step2.svg"
                alt="아기"
                h="16.6dvh"
                objectFit="contain"
              />
              <Button
                size="small"
                type="primary"
                width="104px"
                onClick={() => router.push("/letters/new")}
              >
                <Text textStyle="caption_12800" color="button.button.text.secondary">
                  편지 쓰러가기
                </Text>
              </Button>
            </Flex>

            {/* 정보 카드 */}
            <Box
              gridRow="3"
              display="flex"
              bottom="0"
              flexDirection="row"
              gap="10px"
              maxW="640px"
              overflowX="auto"
              flexWrap="nowrap"
              w="100%"
              px="20px"
              pb="77px"
              css={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {recommendedInfo.length >= 3 ? (
                recommendedInfo.slice(0, 3).map((info) => (
                  <ImageCard
                    key={info.newsId}
                    id={info.newsId}
                    imageUrl={info.imageUrl}
                    title={info.title}
                    description={info.subTitle || ""}
                    onClick={() => handleImageCardClick(`/info/detail/${info.newsId}`)}
                  />
                ))
              ) : (
                Array(3).fill(0).map((_, i) => (
                  <Box
                    key={i}
                    position="relative"
                    w="30.0970873786dvw"
                    minW="186px"
                    maxW="193.33px"
                    h="140px" 
                    overflow="hidden"
                    bg="border.border"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Skeleton height="100%" borderRadius="8px"/>
                  </Box>
                ))
              )}
            </Box>
          </Grid>
        </MobileLayout>
      </Flex>
    </Flex>
  );
}
