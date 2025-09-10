"use client";

import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/Button/Button";
import { ReactNode } from "react";
import { Box, Text } from "@chakra-ui/react";

interface TopBarBottomButtonLayoutProps {
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  hideButton?: boolean;
  topbarTitle?: string;
  topbarRightContent?: ReactNode;
}

export const TopBarBottomButtonLayout = ({
  children,
  onNext,
  onBack,
  nextDisabled = false,
  nextLabel = "다음",
  hideButton = false,
  topbarTitle,
  topbarRightContent,
}: TopBarBottomButtonLayoutProps) => {
  return (
    <Box w="100%" alignItems="center" justifyItems="center">
      <TopBar
        mode="back"
        backgroundType="filled"
        title={topbarTitle}
        rightContent={topbarRightContent}
        onBack={onBack}
      />
      <Box
      w="100%"
      maxW="40rem"
      h="100dvh"
      pt="44px"
      px="20px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      >
        {children}
        {!hideButton && (
          <Box
          w="100%"
          mt="auto"
          pt="1.23dvh"
          pb="1.23dvh"
          position="relative"
          display="flex"
          justifyContent="center"
          zIndex={1}>
            <Button
              type="primary"
              size="large"
              width="100%"
              onClick={onNext}
              isDisabled={nextDisabled}
              aria-label={nextLabel}
            >
              <Text textStyle="body_148001">{nextLabel}</Text>
            </Button>
            <Box
            zIndex={-1}
            position="absolute"
            inset="0 calc(50% - 50dvw)"
            bg="linear-gradient(180deg, rgba(249, 247, 247, 0.0) 6.13%, #f9f7f7 58.93%)"
            _dark={{
              bg: "linear-gradient(180deg, rgba(249, 247, 247, 0.0) 6.13%, #202020 58.93%)"
            }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
