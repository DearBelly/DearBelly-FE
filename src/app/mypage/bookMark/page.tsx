'use client';

import React from 'react'
import { Box } from "@chakra-ui/react";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { testData_all } from '../testData';
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';

const InfoInventory = () => {
    const content_mobile = (
        <Box className='body_wrapper' display="flex" flexDirection="column" alignItems="center" mt='0.62rem' mb='0.62rem'>
            <ContendCardOutput cards={testData_all}/>
        </Box>
    );
    
    return (
        <MobileLayout
            topbarMode='back'
            topbarTitle='북마크 모음'
            topbarBackground='filled'
        >
            {content_mobile}
        </MobileLayout>
    )
}

export default InfoInventory
