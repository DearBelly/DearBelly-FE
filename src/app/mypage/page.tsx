'use client';

import React from 'react';
import { Box, Text } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../../context/BreakPointProvider";
import { MobileLayout } from "../../components/Layouts/MobileLayout";

export default function Mypage () {
    const isPc = useGetBreakPointValue();
    const isMobile = !isPc;

    const content_mobile = (
        <Box></Box>
    );

    return isMobile ? (
        <MobileLayout>
          {content_mobile}
        </MobileLayout>
    ) : (
        '웹'
    );
}

