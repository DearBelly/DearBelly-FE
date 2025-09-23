"use client";

import { MobileLayout } from "@/components/Layouts/MobileLayout";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { NoticeCard } from "@/components/Home/NoticeCard/NoticeCard";
import { ImageCard } from "@/components/Home/ImageCard/ImageCard";
import { Button } from "@/components/Button/Button";
import ShaderBg from "@/components/Home/Background/ShaderBg";
import { useRouter } from "next/navigation";
import { ChakraIcons } from "@/utils/withChakraIcon";
import { useBackgroundStore } from "@/store/useBackgroundStore";
import { useEffect, useState } from "react";
import { Banner } from "@/types/BannerResponse";
import animationData from "@/assets/animation/interaction.json";
import dynamic from "next/dynamic";

export default function Home() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  const [bannerInfo, setBannerInfo] = useState<Banner | null>(null);
  const [recommendCard, setRecommendCard] = useState<any[]>([]);
  const [babyImg, setBabyImg] = useState("/images/babyCharacter/step2.svg");

  const bgState = useBackgroundStore();
  const defaultUrl =
    "https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.5&cAzimuthAngle=60&cDistance=7.1&cPolarAngle=90&cameraZoom=25&color1=%23ff7a33&color2=%2333a0ff&color3=%23ffc53d&destination=onCanvas&embedMode=off&envPreset=dawn&format=gif&fov=50&frameRate=10&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=-0.15&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&type=sphere&uAmplitude=2&uDensity=1.1&uFrequency=5.5&uSpeed=0.05&uStrength=0.4&uTime=0&wireframe=false";

  const Lottie = dynamic(() => import("@/components/Lottie/Lottie"), {
    ssr: false,
  });

  const getBannerInfo = async () => {
    const token =
      localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/letters/top`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("배너 정보 조회 오류");
      const json = await response.json();
      setBannerInfo(json.data);
    } catch (err) {
      console.error("배너 정보 조회 오류: ", err);
    }
  };

  const getRecommendInfo = async () => {
    const token =
      localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("추천 정보 조회 오류");
      const json = await response.json();

      if (json.success && Array.isArray(json.data)) {
        setRecommendCard(
          json.data.map((item: any) => ({
            id: item.newsId,
            title: item.title,
            description: item.subTitle,
            imageUrl: item.imageUrl || "/images/default_image.svg",
            href: `/info/detail/${item.newsId}`,
          }))
        );
      }
    } catch (err) {
      console.error("추천 정보 조회 실패:", err);
    }
  };

  const handleBabyGrowth = () => {
    if (bannerInfo?.week && bannerInfo.week > 0 && bannerInfo.week < 13) {
      setBabyImg("/images/babyCharacter/step1.svg");
    } else if (bannerInfo?.week && bannerInfo.week >= 13 && bannerInfo.week < 28) {
      setBabyImg("/images/babyCharacter/step2.svg");
    } else if (bannerInfo?.week && bannerInfo.week >= 28 && bannerInfo.week <= 45) {
      setBabyImg("/images/babyCharacter/step3.svg");
    } else {
      setBabyImg("/images/babyCharacter/step2.svg"); 
    }
  };

  const handleImageCardClick = (url: string) => {
    router.push(url);
  };

  const topBarIconContent = (
    <Flex gap="12px" color="icon.icon5">
      <ChakraIcons.EnvelopeSolid
        size={24}
        onClick={() => router.push("/letters")}
      />
      <ChakraIcons.StoreSolid size={24} onClick={() => router.push("/store")} />
    </Flex>
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
    getBannerInfo();
    getRecommendInfo();
  }, []);

  useEffect(() => {
    handleBabyGrowth();
  }, [bannerInfo]);

  return (
    <Flex w="100dvw" h="100dvh" justify="center" position="relative" overflow="hidden">
      {/* 배경 */}
      <Box position="absolute" top={0} left={0} w="100%" h="100%" zIndex={0}>
        <ShaderBg
          urlString={
            bgState.backgrounds.find((bg) => bg.id === bgState.appliedId)?.urlPath || defaultUrl
          }
        />
      </Box>

      {/* 인터렉션 */}
      <Lottie
        animationData={animationData}
        loop
        speed={0.4}
        autoplay
        style={{
          width: "120rem",
          height: "120rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      />

      {/* 메인 컨텐츠 */}
      <Flex w="100%" maxW="40rem" m="0 auto" position="relative" overflow="hidden" zIndex={2}>
        <MobileLayout
          contentBackground="transparent"
          topbarMode="whiteLogo"
          topbarBackground="transparent"
          hasSidePadding={false}
          topbarContent={topBarIconContent}
          hasTopPadding={false}
          hasBottomPadding={false}
        >
          <Grid templateRows="auto 1fr auto" h="100%" w="100%" position="relative">
            {/* 공지 */}
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
              <Image src={babyImg} alt="아기" maxH="25dvh" objectFit="contain" />
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

            {/* 카드 파트 */}
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
              pb="calc(77px + env(safe-area-inset-bottom))"
              css={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {recommendCard.length > 0 ? (
                recommendCard.map((card) => (
                  <ImageCard
                    key={card.id}
                    imageUrl={card.imageUrl}
                    title={card.title}
                    description={card.description}
                    onClick={() => handleImageCardClick(card.href)}
                  />
                ))
              ) : (
                <>
                  <ImageCard
                    imageUrl="/images/image.png"
                    title="깊이 잠들고 싶은 당신에게 추천하는 5가지 방법"
                    description="깊이 숙면하는 방법"
                    onClick={() => handleImageCardClick("/info/detail")}
                  />
                  <ImageCard
                    imageUrl="/images/image.png"
                    title="임산부 불면증에 좋은 요가"
                    description="음악과 함께하는 요가"
                    onClick={() => handleImageCardClick("/info/detail")}
                  />
                  <ImageCard
                    imageUrl="/images/image.png"
                    title="겨울에 집에서 하기 좋은 운동 10가지"
                    description="집안에서 가볍게 할 수 있는 운동법"
                    onClick={() => handleImageCardClick("/info/detail")}
                  />
                </>
              )}
            </Box>
          </Grid>
        </MobileLayout>
      </Flex>
    </Flex>
  );
}