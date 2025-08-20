'use client';

import React, {type ReactNode} from 'react'
import { Box } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../../../context/BreakPointProvider";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { useRouter } from 'next/navigation';

export default function familyCode() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;
  const router = useRouter(); 

  const content_mobile = (
    <>
    <Box className=''>

    </Box>
    </>
  );
  

  return isMobile ? (
    <MobileLayout
      topbarMode='back'
      topbarTitle= '가족 공유 코드'
      showButtomNav={false}
    >
      {content_mobile}
    </MobileLayout>
  ) : (
      '웹'
  );

};