"use client";

import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { TopBar } from "../TopBar/TopBar";
import { BottomNavigation } from "../BottomNavigation/BottomNavigation";

interface MobileLayoutProps {
  topbarContent?: ReactNode;
  children: ReactNode;
  contentBackground?: "filled" | "transparent";
  hasTopPadding?: boolean;
  hasSidePadding?: boolean;
  hasBottomPadding?: boolean;
  topbarMode?: "logo" | "back" | "whiteLogo";
  topbarBackground?: "filled" | "transparent";
  topbarTitle?: string;
  showBottomNav?: boolean;
  searchbarContent?: ReactNode;
  onBack?: () => void;
  disableNavPointer?: boolean;
}

export const MobileLayout = ({
  topbarContent,
  children,
  contentBackground = "filled",
  hasTopPadding = true,
  hasSidePadding = true,
  hasBottomPadding = true,
  topbarMode = "logo",
  topbarBackground = "filled",
  topbarTitle,
  showBottomNav = true,
  searchbarContent,
  onBack,
  disableNavPointer = false,
}: MobileLayoutProps) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      w="100%"
      minH="100dvh"                       
      bg={contentBackground === "filled" ? "bg.bg1" : "transparent"}
      m="0 auto"
      position="relative"
    >
      <Box position="sticky" top="0" w="100%" zIndex="header">
        <TopBar
          mode={topbarMode}
          backgroundType={topbarBackground}
          rightContent={topbarContent}
          title={topbarTitle}
          searchContent={searchbarContent}
          onBack={topbarMode === "back" ? onBack : undefined}
        />
      </Box>

      <Box
        as="main"
        flex="1"
        w="100%"
        boxSizing="border-box"
        pr={hasSidePadding ? "20px" : 0}
        pl={hasSidePadding ? "20px" : 0}
        pt={hasTopPadding ? "44px" : 0}
        pb={hasBottomPadding && showBottomNav ? "54px" : 0}
        overflowY="auto"
        css={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </Box>

      {showBottomNav && (
        <Box
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          zIndex="bottomNav"
          pointerEvents={disableNavPointer ? "none" : "auto"} 
        >
          <BottomNavigation />
        </Box>
      )}
    </Flex>
  );
};
