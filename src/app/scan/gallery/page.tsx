"use client"
import React from 'react'
import { Box } from "@chakra-ui/react";
<<<<<<< HEAD:src/pages/ComputerVision/Gallery.tsx
import { useGetBreakPointValue } from "../../context/BreakPointProvider";
import { PhotoGuideModal } from "../../components/ComputerVision/Photo/PhotoGuideModal";
import { PhotoBtn } from "../../components/ComputerVision/Photo/PhotoBtn";
import { useRouter } from "next/router";
=======
import { useGetBreakPointValue } from "@/context/BreakPointProvider";
import { PhotoGuideModal } from "@/components/ComputerVision/Photo/PhotoGuideModal";
import { PhotoBtn } from "@/components/ComputerVision/Photo/PhotoBtn";
>>>>>>> cf89641a0b0475e54e3122c4d6a99197d24bfd6c:src/app/scan/gallery/page.tsx

export default function Gallery() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const router = useRouter();
  const handleResultClick = () => {
    router.push('/ComputerVision/Result');
  };

  const content = (
    <Box bg="#737373" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <PhotoGuideModal>
        <PhotoBtn variant="large" onClick={handleResultClick}>확인</PhotoBtn>
      </PhotoGuideModal>
    </Box>
  );

  return isMobile ? (
      content
  ) : (
    content
  );
}