import * as React from "react"; 
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import customTheme from "../customTheme";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from 'framer-motion';

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
        transition={{ duration: 0.15 }}
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