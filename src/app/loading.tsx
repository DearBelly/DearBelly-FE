'use client'

import React from 'react'
import { Box, Image } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../context/BreakPointProvider";

export default function Loading() {
    const isPc = useGetBreakPointValue();

    return (
        <Box 
            display='flex'
            alignItems='center'
            justifyContent='center'
            backgroundColor='bg.bg1'
            height='100vh'
        >
            {isPc ? <Image src='/images/computerVision/spinner.svg' alt='로딩 스피너' width='10vw'/> : <Image src='/images/computerVision/spinner.svg' alt='로딩 스피너' width='30vw'/>}
        </Box>
    );
}