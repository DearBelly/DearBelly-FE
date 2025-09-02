"use client";

import { Box, Text, Portal } from "@chakra-ui/react";
import { Button } from "../Button/Button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteModal = ({
  isOpen,
  onClose,
  onDelete,
}: DeleteModalProps) => {
  if (!isOpen) return null;

  const noticeText = "정말 삭제하시겠습니까?"

  return (
    <Portal>
      {/* 배경 */}
      <Box
        position="fixed"
        inset={0}
        bg="rgba(0, 0, 0, 0.5)"
        zIndex={9999}
        onClick={onClose} 
      />

      {/* 모달창 */}
      <Box
        role="dialog"
        aria-modal="true"
        position="fixed"
        inset={0}
        zIndex={9999}
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={onClose}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          w="76dvw"
          borderRadius="1.25rem"
          bg="bg.bg3"
          p="1.75rem 1rem 1rem 1rem"
        >
          <Text textStyle="body_168001" textAlign="center">
            {noticeText}
          </Text>

          <Box display="flex" mt="1.75rem" gap="0.5rem" justifyContent="center" alignItems="center">
            <Button type="secondary" size="medium" onClick={onClose} width="122.5px">
              <Text textStyle="caption_12800" color="button.text.teritery">취소</Text>
            </Button>
            <Button type="primary" size="medium" onClick={onDelete} width="122.5px">
              <Text textStyle="caption_12800" color="button.text.secondary">삭제하기</Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </Portal>
  );
};
