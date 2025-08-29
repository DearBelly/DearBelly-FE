'use client';

import React from 'react'
import { Box, Text } from "@chakra-ui/react";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";

export default function PersonalInfoAgree() {
  const content_mobile = (
    <>
      <Box>
      </Box>
    </>
  );

  return (
    <MobileLayout
      topbarMode="back"
      topbarTitle="개인 정보 수집 동의"
      topbarBackground="filled"
    >
      {content_mobile}
    </MobileLayout>
  );
}
