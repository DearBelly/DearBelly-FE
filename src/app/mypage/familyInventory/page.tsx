'use client';

import React from 'react'
import { Box, Text } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../../../context/BreakPointProvider";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { ProfileList } from '@/components/ProfileList/ProfileList';
import { ProfileListOutput } from '@/components/ProfileList/ProfileListOutput';
import { testData } from '../testData';

export default function familyInventory() {
    const isPc = useGetBreakPointValue();
    const isMobile = !isPc;

    const content_mobile = (
        <Box className='body_wrapper' display="flex" flexDirection="column" alignItems="center">
            <Box className='me_wrapper' mt='0.63rem' mb='1.62rem'>
                <Text
                    color="#000"
                    fontFamily="NanumSquare Neo"
                    fontSize="0.875rem"
                    fontWeight="400"
                    lineHeight="1.5rem"
                    letterSpacing="-0.0175rem"
                    mb='0.31rem'
                    ml='0.5rem'
                >
                    임산부
                </Text>
                <ProfileList
                    mode='default'
                    name='김서진'
                    isMe={true}
                />
            </Box>

            <Box className='me_wrapper'>
                <Text
                    color="#000"
                    fontFamily="NanumSquare Neo"
                    fontSize="0.875rem"
                    fontWeight="400"
                    lineHeight="1.5rem"
                    letterSpacing="-0.0175rem"
                    mb='0.31rem'
                    ml='0.5rem'
                >
                    보호자
                </Text>
                <ProfileListOutput cards={testData}/>
            </Box>
        </Box>
    );
    
    return isMobile ? (
        <MobileLayout
          topbarMode='back'
          topbarTitle='가족 목록'
          topbarBackground='filled'
        >
          {content_mobile}
        </MobileLayout>
      ) : (
        <MobileLayout
          topbarMode='back'
          topbarTitle='가족 목록'
          topbarBackground='filled'
        >
          {content_mobile}
        </MobileLayout>
      );
    }
