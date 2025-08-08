'use client';

import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useGetBreakPointValue } from "../context/BreakPointProvider";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Splash() {
  const isPc = useGetBreakPointValue();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/info');
    }, 2700);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Box
      bg="#F9F7F7"
      display="flex"
      justifyContent="center"
      width="100dvw"
      height="100dvh"
    >
      <MotionBox
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100%"
        gap="30.5px"
        mt={isPc ? "27.4dvh" : "27.4dvh"}
      >
        <Image
          src="/logos/logo.svg"
          alt="logo"
          width={150}
          height={115}
          priority
        />
        <Image
          src="/logos/logo_text.svg"
          alt="logo text"
          width={152.65}
          height={30}
          priority
        />
      </MotionBox>
    </Box>
  );
}
