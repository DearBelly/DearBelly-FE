'use client';

import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';
import { useGetBreakPointValue } from "../context/BreakPointProvider";
import dynamic from "next/dynamic";
import animationData from "@/assets/animation/splash.json";

export default function Splash() {
  const isPc = useGetBreakPointValue();
  const router = useRouter();

  const Lottie = dynamic(() => import("@/components/Lottie/Lottie"), { ssr: false });

  useEffect(() => {
    router.prefetch("/home");
  }, [router]);

  const handleComplete = () => {
    router.push('/home');
  }

  return (
    isPc ? (
    <Box
      bg="bg.bg1"
      display="flex"
      justifyContent="center"
      alignItems="center" 
      width="100dvw"
      minH="100dvh"        
      overflow="hidden"   
    >
      <Flex w="400px" h="400px" pt="95px" pb="75px" pl="40px" pr="60px">
      <Lottie 
        animationData={animationData} 
        loop={false}
        speed={0.25} 
        style={{ width: "100%", height: "100%" }}
        segment={[0, 200]}
        onComplete={handleComplete}
      />
      </Flex>
    </Box>
    ) : (
    <Box
      bg="bg.bg1"
      display="flex"
      justifyContent="center"
      alignItems="center" 
      width="100dvw"
      minH="100dvh"        
      overflow="hidden"   
    >
      <Flex w="200px" h="200px" pt="47.5px" pb="37.5px" pl="20px" pr="30px">
      <Lottie 
        animationData={animationData} 
        loop={false}
        speed={0.25} 
        style={{ width: "100%", height: "100%" }}
        segment={[0, 200]}
        onComplete={handleComplete}
      />
      </Flex>
    </Box>
    )
  )
};
