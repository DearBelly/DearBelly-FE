'use client';

import { MobileLayout } from "@/components/Layouts/MobileLayout";
import { Box, Flex, Grid, Image, Skeleton, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import { NoticeCard } from "@/components/Home/NoticeCard/NoticeCard";
import { ImageCard } from "@/components/Home/ImageCard/ImageCard";
import { Button } from "@/components/Button/Button";
import ShaderBg from "@/components/Home/Background/ShaderBg";
import { useRouter } from "next/navigation";
import { ChakraIcons } from "@/utils/withChakraIcon";
import { useBackgroundStore } from "@/store/useBackgroundStore";

export default function Home() {
  const router = useRouter();
  const bgState = useBackgroundStore();
  const defaultUrl = "https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.5&cAzimuthAngle=60&cDistance=7.1&cPolarAngle=90&cameraZoom=25&color1=%23ff7a33&color2=%2333a0ff&color3=%23ffc53d&destination=onCanvas&embedMode=off&envPreset=dawn&format=gif&fov=50&frameRate=10&grain=off&http%3A%2F%2Flocalhost%3A3002%2Fcustomize%3Fanimate=on&lightType=3d&pixelDensity=1&positionX=0&positionY=-0.15&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&toggleAxis=false&type=sphere&uAmplitude=2&uDensity=1.1&uFrequency=5.5&uSpeed=0.05&uStrength=0.4&uTime=0&wireframe=false&zoomOut=false";

  const handleImageCardClick = (url: string) => {
    router.push(url);
  };

  const topBarIconContent = (
    <Flex gap="12px" color="icon.icon5">
      <ChakraIcons.EnvelopeSolid
        size={24}
        onClick={() => router.push("/letters")}
      />
      <ChakraIcons.StoreSolid
        size={24}
        onClick={() => router.push("/store")}
      />
    </Flex>
  );

  return (
    <Flex w="100%" justify="center">
      {/* 배경 */}
      <ShaderBg
        urlString={bgState.backgrounds.find((bg) => bg.id === bgState.appliedId)?.urlPath || defaultUrl}
      />
      
      <Flex w="100%" maxW="40rem" m="0 auto" position="relative">
        <MobileLayout
          contentBackground="transparent"
          topbarMode="whiteLogo"
          topbarBackground="transparent"
          hasSidePadding={false}
          topbarContent={topBarIconContent}
          hasTopPadding={false}
          hasBottomPadding={false}
        >
          <Grid
            templateRows="auto 1fr auto"
            h="100dvh"
            w="100%"
            position="relative"
            zIndex={1}
          >
            {/* 공지 */}
            <Box gridRow="1" w="fit-content" ml="auto" mt="3.75rem" mr="20px">
              <NoticeCard
                mode="default"
                noticeText={"분홍이를 만난 지\n3주가 되었어요!"}
              />
            </Box>

            {/* 일러스트 + 버튼 */}
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
              <Box w="100%" position="relative" h="100%">
                <NextImage
                  priority
                  src="/images/babyCharacter/step2.svg"
                  alt="아기"
                  objectFit="contain"
                />
              </Box>
              <Button
                size="small"
                type="primary"
                width="104px"
                onClick={() => router.push("/letters/new")}
              >
                <Text
                  textStyle="caption_12800"
                  color="button.button.text.secondary"
                >
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
              pb="77px"
              css={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >

            </Box>
          </Grid>
        </MobileLayout>
      </Flex>
    </Flex>
  );
}
