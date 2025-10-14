"use client";

import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { Box, Grid } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useBackgroundStore } from "@/store/useBackgroundStore";
import { ChakraIcons } from "@/lib/withChakraIcon";
import Image from "next/image";
import { useState } from "react";

export default function StorePage() {
  const router = useRouter();
  const bgState = useBackgroundStore();
  const [loaded, setLoaded] = useState(false);

  const handleApply = () => {
    bgState.apply();
  };

  return (
    <TopBarBottomButtonLayout
      topbarTitle="상점"
      nextLabel="완료"
      onNext={handleApply}
      onBack={() => router.push("/home")}
    >
      <Grid mt="20px" templateColumns="repeat(2, 1fr)" gap="12px">
        {bgState.backgrounds.map((bg) => {
          const isApplied = bgState.isApplied(bg.id);
          const isChecked = bgState.isChecked(bg.id);

          return (
            <Box
              key={bg.id}
              bgImage={bg.thumbnailPath}
              bgSize="cover"
              bgPos="center"
              w="42.666dvw"
              h="190px"
              maxW="264px"
              borderRadius="16px"
              position="relative"
              onClick={() => bgState.click(bg.id)}
              style={{ display: loaded ? 'block' : 'none' }} 
              onLoad={() => setLoaded(true)}
            >
              <Box position="absolute" top="12px" left="12px">
                {isApplied ? (
                  <Image
                    src="/images/icon_applied.svg"
                    alt="applied"
                    width={54}
                    height={22}
                    priority
                    style={{ display: loaded ? 'block' : 'none' }} 
                    onLoad={() => setLoaded(true)}
                  />
                ) : (
                  <ChakraIcons.CheckCircleSolid
                    size={24}
                    color={
                      isChecked
                        ? "icon.icon5" 
                        : "rgba(255,255,255,0.2)" 
                    }
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Grid>
    </TopBarBottomButtonLayout>
  );
}
