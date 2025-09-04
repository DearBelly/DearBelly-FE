"use client";

import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { TopBar } from "../TopBar/TopBar";
import { BottomNavigation } from "../BottomNavigation/BottomNavigation";
interface MobileLayoutProps {
  topbarContent?: ReactNode;
  children: ReactNode;
  hasTopPadding?: boolean;
  hasSidePadding?: boolean;
  hasBottomPadding?: boolean;
  topbarMode?: "logo" | "back" | "whiteLogo";
  topbarBackground?: "filled" | "transparent";
  topbarTitle?: string;
  showButtomNav?: boolean;
  searchbarContent?: ReactNode;
  backurl?: string;
}

export const MobileLayout = ({
  topbarContent,
  children,
  hasTopPadding = true,
  hasSidePadding = true,
  hasBottomPadding = true,
  topbarMode = "logo",
  topbarBackground = "filled",
  topbarTitle,
  showButtomNav = true,
  searchbarContent,
}: MobileLayoutProps) => {
  return (
    <Flex
      direction="column"
      align="center"
      minW="100vw"
      minH="100vh"
      bg="bg.bg1"
      m="0 auto"
      position="relative"
    >
      <TopBar
        mode={topbarMode}
        backgroundType={topbarBackground}
        rightContent={topbarContent}
        title={topbarTitle}
        searchContent={searchbarContent}
      />

      <Box
        as="main"
        flex="1"
        w="100%"
        boxSizing="border-box"
        pr={hasSidePadding ? "20px" : 0}
        pl={hasSidePadding ? "20px" : 0}
        pt={hasTopPadding ? "44px": 0} 
        pb={hasBottomPadding && showButtomNav ? "54px" : 0}
        overflowY="auto"
        css={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </Box>

      {showButtomNav && <BottomNavigation />}
    </Flex>
  );
};
