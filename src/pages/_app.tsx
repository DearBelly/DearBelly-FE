import * as React from "react"; 
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import customTheme from "../customTheme";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from 'framer-motion';
// 캐러셀 기능을 위해 import
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BreakPointProvider = dynamic(
  () => import("../context/BreakPointProvider").then(mod => mod.BreakPointProvider),
  { ssr: false }
);

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.asPath}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
       >
        <ChakraProvider theme={customTheme}>
          <BreakPointProvider>
            <Component {...pageProps} />
          </BreakPointProvider>
        </ChakraProvider>
      </motion.div>
    </AnimatePresence>
  );
}