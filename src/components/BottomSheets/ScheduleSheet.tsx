'use client';

import { Box, Drawer, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { ChakraIcons } from "@/utils/withChakraIcon";
import Image from "next/image";
import { DeleteModal } from "../Modals/DeleteModal";


export interface ScheduleBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, bgColor: string) => void;
}

export const ScheduleBottomSheet = ({
    open,
    onClose,
    onSubmit,
  }: ScheduleBottomSheetProps) => {
    const [content, setContent] = useState("");
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [selectedColor, setSelectedColor] = useState("bg.calendar1");
    const colors = [
      "bg.calendar1",
      "bg.calendar2",
      "bg.calendar3",
      "bg.calendar4",
      "bg.calendar5",
    ];
    
    return (
      <>
        <Drawer.Root open={open} onOpenChange={(e) => !e.open && onClose()} placement="bottom">
          <Drawer.Backdrop bg="rgba(0, 0, 0, 0.5)" />
          <Drawer.Positioner>
            <Drawer.Content borderTopRadius="20px" bg={selectedColor} px="16px" pt="20px" pb="calc(16px + env(safe-area-inset-bottom))">
              {/* 입력창 */}
              <Textarea
                p="0"
                textStyle="body_168001"
                bg="transparent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="오늘의 할 일"
                resize="none"
                border="none"
                maxHeight="300px"
                _focus={{ outline: "none" }}
                wordBreak="break-all"
              />
  
              {/* 색상 선택 + 아이콘 */}
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mt="16px"
              >
                <Box display="flex" gap="12px">
                  {colors.map((c) => (
                    <Box
                      key={c}
                      w="20px"
                      h="20px"
                      borderRadius="full"
                      border={selectedColor === c ? "2px solid black" : "2px solid transparent"}
                      bg={c}
                      cursor="pointer"
                      onClick={() => setSelectedColor(c)}
                    />
                  ))}
                </Box>
  
                <Box display="flex" alignItems="center" gap="12px">
                  <ChakraIcons.TrashSolid
                    size={24}
                    color="icon.icon1"
                    onClick={() => setIsOpenDeleteModal(true)}
                  />
                  <Image
                    src="/images/icon_send.svg"
                    alt="send"
                    width={40}
                    height={40}
                    onClick={() => {
                      if (content.trim()) {
                        onSubmit(content, selectedColor);
                      }
                      setContent("");
                      onClose();
                    }}
                  />
                </Box>
              </Box>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
        <DeleteModal
          isOpen={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
          onDelete={() => {
            setContent("");
            setIsOpenDeleteModal(false);
          }}
        />
      </>
    );
  }
  