'use client';

import { Box, Text } from "@chakra-ui/react";
import { Button } from "@/components/Button/Button";
import { ChakraIcons } from "@/utils/withChakraIcon";
import router from "next/router";

interface NoticeCardProps {
  noticeText: string;
  mode: "default" | "button";
}

export const NoticeCard = ({ noticeText, mode }: NoticeCardProps) => {
  return (
    <Box bg="bg.bg5" borderRadius="16px" px="16px" py="14px" w="fit-content" h="100%">
        {mode === "default" && (
            <Text textStyle="body_168002" color="#000000" textAlign="right" whiteSpace="pre-line">{noticeText.replace(/\\n/g, '\n')}</Text>
        )}
        {mode === "button" && (
            <Box display="flex" flexDirection="column" alignItems="flex-end" gap="10px">
                <Text textStyle="body_168002" color="#000000" textAlign="right" whiteSpace="pre-line">{noticeText.replace(/\\n/g, '\n')}</Text>
                <Button size="small" type="primary" width="98px" onClick={() => {router.push("/mypage/babyInfo")}}>
                  <Box display="flex" alignItems="center" justifyContent="center" flexDirection="row" gap="8px">
                    <Text textStyle="caption_12800" color="button.text.secondary" whiteSpace="nowrap">등록하기</Text>
                    <ChakraIcons.BabySolid size={20} color="icon.icon5" />
                  </Box>
                </Button>
            </Box>
        )}
    </Box>
  )
}