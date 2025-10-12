'use client';

import { Box, Drawer, Portal, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ChakraIcons } from "@/lib/withChakraIcon";
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
      <Portal>
        <Drawer.Root open={open} onOpenChange={(e) => !e.open && onClose()} placement="bottom">
          <Drawer.Backdrop bg="rgba(0, 0, 0, 0.5)" />
          <Drawer.Positioner>
            <Drawer.Content 
              w="100%" 
              maxW="40rem" 
              borderTopRadius="20px" 
              bg={selectedColor} 
              px="16px" 
              pt="20px" 
              pb="16px"
              mx="auto"
            >
              <Input
                p="0"
                textStyle="body_168001"
                bg="transparent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="오늘의 할 일"
                border="none"
                _focus={{ outline: "none" }}
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
      </Portal>
    );
  }
  