'use client';

import { MobileLayout } from "@/components/Layouts/MobileLayout";
import { useGetBreakPointValue } from "@/context/BreakPointProvider";
import { EnvelopeSolid, StoreSolid } from "@mynaui/icons-react";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { Button } from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

export default function Home() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;
  const router = useRouter();

  const ShaderBg = dynamic(
    () => import("@/components/Home/Background/ShaderBg"),
    { ssr: false }
  );

  const handleImageCardClick = (url: string) => {
    router.push(url);
  };

  const topBarIconContent = (
    <Flex gap="12px" color="icon.icon5">
      <EnvelopeSolid size={24} />
      <StoreSolid size={24} />
    </Flex>
  );

  return isMobile ? (
    <MobileLayout
      topbarBackground="transparent"
      topbarContent={topBarIconContent}
    >
      {/* 배경 */}
      <ShaderBg
        urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.5&cAzimuthAngle=60&cDistance=7.1&cPolarAngle=90&cameraZoom=25&color1=%23ff7a33&color2=%2333a0ff&color3=%23ffc53d&destination=onCanvas&embedMode=off&envPreset=dawn&format=gif&fov=50&frameRate=10&grain=off&http%3A%2F%2Flocalhost%3A3002%2Fcustomize%3Fanimate=on&lightType=3d&pixelDensity=1&positionX=0&positionY=-0.15&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&toggleAxis=false&type=sphere&uAmplitude=2&uDensity=1.1&uFrequency=5.5&uSpeed=0.05&uStrength=0.4&uTime=0&wireframe=false&zoomOut=false"
      />
      <Grid
        templateRows="auto 1fr auto"
        minH="100dvh"
        w="100%"
        position="relative"
        zIndex={1}
      >
        {/* 공지 */}
        <Box gridRow="1" w="fit-content" ml="auto" mt="16px" mr="20px">
        </Box>

        {/* 일러스트 + 버튼 */}
        <Flex
          gridRow="2"
          direction="column"
          align="center"
          justify="center"
          gap="20px"
          w="72vw"
          mx="auto"
        >
          <Image src="/images/letter.svg" alt="편지" h="7.5dvh" objectFit="contain" onClick={() => router.push("/letters")}/>
          <Image src="/images/babyCharacter/step1.svg" alt="아기" h="16.6dvh" objectFit="contain" />
          <Button size="small" type="primary" width="104px" onClick={() => router.push("/letters/new")}>
            <Text textStyle="caption_12800" color="button.button.text.secondary">
              편지 쓰러가기
            </Text>
          </Button>
        </Flex>

        {/* 카드 파트 */}
        <Box
          gridRow="3"
          display="flex"
          flexDirection="row"
          gap="10px"
          overflowX="auto"
          flexWrap="nowrap"
          w="100%"
          px="20px"
          pb="120px"
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
  ) : (
    "웹용"
  );
}
