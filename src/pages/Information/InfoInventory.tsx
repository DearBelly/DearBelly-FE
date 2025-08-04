import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";
import { iconData } from './testData';
import { CategoryIconOutput } from '@/components/CategoryIcon/CategoryIconOutput';
import { useGetBreakPointValue } from "../../context/BreakPointProvider";
import { MobileLayout } from "../../components/Layouts/MobileLayout";

const InfoInventory = () => {
    const isPc = useGetBreakPointValue();
    const isMobile = !isPc;

    const router = useRouter();
    const handleDetailClick = () => {
      router.push('/Information/InformationDetail');
    };

    const content_mobile = (
        // margin='0 5.56vw'
        <Box className='body_wrapper' display="flex" flexDirection="column" alignItems="center">
            {/* 아이콘 카테고리 영역 */}
            {/*  width="calc(100vw - 11.12vw)" */}
            <Box className='category_icon_wrapper' width="100%" height='5.25rem'>
                <CategoryIconOutput cards={iconData}/>
            </Box>
        </Box>
    );
    
    return isMobile ? (
        <MobileLayout>
          {content_mobile}
        </MobileLayout>
      ) : (
        <div>Information</div>
      );
    }

export default InfoInventory