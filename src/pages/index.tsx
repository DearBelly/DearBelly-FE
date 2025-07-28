import React, { useEffect } from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { useGetBreakPointValue } from "../context/BreakPointProvider";
import * as motion from "motion/react-client"

export default function Home() {
  const isPc = useGetBreakPointValue();

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Box
      bg="#F9F7F7"
      minW="320px"
      minH="100vh"
      display="flex"
      flexDirection="column"
    >
    {isPc ? (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 1.5,
            delay: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        }}
        >
        <Image src="/icons/logo.svg" alt="logo" width="18.75rem" height="18.75rem" mb={4} />
        <Image src="/icons/logo_text.svg" alt="logo text" width="18.75rem" height="auto" />
      </motion.div>
    ) : (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 1.5,
            delay: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
      }}
      >
        <Image src="/icons/logo.svg" alt="logo" width="9.375rem" height="auto" mt="16.66rem" mb="1.91rem" ml="6.75rem" />
        <Image src="/icons/logo_text.svg" alt="logo text" width="9.54069rem" height="auto" ml="7rem" />
      </motion.div>
    )}
    </Box>
  );
}