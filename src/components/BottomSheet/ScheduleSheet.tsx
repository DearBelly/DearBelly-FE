'use client';

import { Box, Drawer, Textarea } from "@chakra-ui/react";
import { useState, useRef, useLayoutEffect, useCallback } from "react";
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
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  const MAX_H = 300; 

  const autoResize = useCallback(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const next = Math.min(ta.scrollHeight, MAX_H);
    ta.style.height = `${next}px`;
    ta.style.overflowY = ta.scrollHeight > MAX_H ? "auto" : "hidden";
  }, []);

  useLayoutEffect(() => {
    autoResize();
  }, [content, open, autoResize]);

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
        <Drawer.Backdrop bg="rgba(0, 0, 0, 0.5)" zIndex={10} />
        <Drawer.Positioner w="100%" display="flex" justifyContent="center">
          <Drawer.Content
            justifyContent="center"
            borderTopRadius="20px"
            bg={selectedColor}
            px="16px"
            pt="20px"
            pb="16px"
            gap="13px"
            maxW="40rem"
          >
            <Textarea
              ref={taRef}
              rows={1}                    
              p="0"
              textStyle="body_168001"
              lineHeight="1.25rem"        
              bg="transparent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onInput={autoResize}       
              placeholder="오늘의 할 일"
              resize="none"               
              border="none"
              maxH={`${MAX_H}px`}          
              _focus={{ outline: "none" }}
              wordBreak="break-all"
              overflowY="hidden"          
            />

            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
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
};