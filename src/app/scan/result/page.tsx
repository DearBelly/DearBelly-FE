'use client';

import React from 'react'
import { useRouter } from 'next/navigation';
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useGetBreakPointValue } from "../../../context/BreakPointProvider";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { BottomBtn } from '@/components/ComputerVision/BottomBtn/BottomBtn';
import { DangerCircle } from "@mynaui/icons-react";
import { X } from "@mynaui/icons-react";

// 더미 데이터
const testDataName : string = 
`한림모사프리드정5밀리그램`

const testData : string = `
한림모사프리드정5밀리그램은 임산부가 복용해도 안전한 약으로 알려져 있습니다. 하지만, 임신 초기에는 특히 약물에 대한 노출을 최소화하는 것이 좋습니다. 임신 중이거나 임신을 계획 중인 경우, 반드시 의사나 약사와 상의 후 복용해야 합니다.\n\n
주의사항으로는 다음과 같은 것들이 있습니다. 첫째, 이 약은 식사 후 즉시 복용해야 합니다. 둘째, 복용 시에는 알코올을 피해야 합니다. 셋째, 이 약은 장을 자극할 수 있으므로, 장에 문제가 있는 사람들은 복용에 주의해야 합니다. 넷째, 이 약은 혈압을 올릴 수 있으므로, 고혈압 환자들은 복용에 주의해야 합니다. 다섯째, 이 약은 혈당을 올릴 수 있으므로, 당뇨병 환자들은 복용에 주의해야 합니다.\n\n
마지막으로, 이 약에 대한 알레르기 반응이 있었던 사람들은 복용을 피해야 합니다. 이외에도 특정 사람들에게는 다른 부작용이 있을 수 있으므로, 복용 전에 의사나 약사와 상의하는 것이 중요합니다.\n\n
`
const TopRightIcons = () => {
  const router = useRouter();
  const handleScanClick = () => {
    router.push('/scan');
  };

  return (
    <div style={{ cursor: 'pointer' }}>
      <X onClick={handleScanClick} size='1.5rem'/>
    </div>
  );
};

export default function Result() {
    const isPc = useGetBreakPointValue();
    const isMobile = !isPc;

    const router = useRouter();
    const handleScanClick = () => {
      router.push('/scan');
    };

    const parseText = (text: string) => {
        return text.trim().split('\n\n').map((para, i) => (
          <Box key={i}>
            {para.split('\n').map((line, j) => (
              <React.Fragment key={j}>
                {line}
                {j !== para.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </Box>
        ));
    };

    // 더미데이터
    const safe_num:number = 1;

    const content_mobile = (
      <Box className='all_wrapper'>
        {testData?.trim() ? (
          <>
            <Box className='image_wrapper' width='100%' height='100%' padding='0 3.91rem' mt='1.25rem'>
              <img src="/images/med.svg" width='100%' height='auto' />
            </Box>
    
            <Box className='content_wrapper' width='100%' height='100%' padding='0 1.25rem' mt='1.88rem'>
              <SafeDangerStyle isSafe={safe_num === 1}>
                {safe_num === 1 ? "해당 약품은 복용 시, 안전합니다." : "해당 약품은 복용 시, 위험합니다."}
              </SafeDangerStyle>

              <Box className='title_wrapper' display="flex" gap="0.2rem">
                <MediName fontWeight='700'>약품명 :</MediName>
                <MediName fontWeight='500'>{testDataName}</MediName>
              </Box>
    
              <MediContent>{parseText(testData)}</MediContent>
            </Box>
    
            <Box className='btn_wrapper'>
              <BottomBtn onClick={handleScanClick}>확인 완료</BottomBtn>
            </Box>
          </>
        ) : (
          <Box 
            className="error_wrapper"
            position="absolute" 
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"  
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"    
            gap='0.5rem'
          >
            <DangerCircle size='8vh' color='#DADADA' />
            <ErrorContent>조회된 알약 데이터가 없습니다</ErrorContent>
          </Box>
        )}
      </Box>
    );
    

    return isMobile ? (
        <MobileLayout 
            topbarMode='back'
            topbarTitle= '분석결과'
            showButtomNav={false}
            topbarContent={<TopRightIcons/>}
        >
            {content_mobile}
        </MobileLayout>
    ) : (
        '웹'
    )
}

interface MediNameProps {
    children: ReactNode;
    fontWeight?: number | string;
}
interface SafeDangerStyleProps {
  children: ReactNode;
  isSafe: boolean;
};

export const MediName = ({ children, fontWeight = 700 }: MediNameProps) => (
    <Box
      color="#000"
      fontFamily="NanumSquare Neo"
      fontSize="0.75rem"
      fontStyle="normal"
      fontWeight={fontWeight}
      lineHeight="1rem"
      letterSpacing="-0.0075rem"
    >
      {children}
    </Box>
);

export const MediContent = ({ children }: { children: ReactNode }) => (
    <Box
      justifyContent='space-around'
      color="#000"
      textAlign="justify"
      fontFamily="NanumSquare Neo"
      fontSize="0.75rem"
      fontStyle="normal"
      fontWeight={400}
      lineHeight="1.25rem"
      letterSpacing="-0.015rem"
      mt="0.69rem"
      paddingBottom='0.69rem'
    >
      {children}
    </Box>
);

export const ErrorContent = ({ children }: { children: ReactNode }) => (
    <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    color="#DADADA"
    fontFamily="NanumSquare Neo"
    fontSize="0.9rem"
    fontStyle="normal"
    fontWeight={700}
    lineHeight="1.25rem"
    letterSpacing="-0.015rem"
    px="1rem"
    maxWidth="90%"

    // 미디어별 한 줄 처리를 위해 추가함 
    whiteSpace="nowrap"
    overflow="hidden"
    textOverflow="ellipsis"
    >
      {children}
    </Box>
);

export const SafeDangerStyle = ({ children, isSafe }: SafeDangerStyleProps) => (
  <Box
    display="inline-block"
    background={isSafe ? "#C4E6C9" : "#FFA471"}
    color="var(--Text-Text-1, #202020)"
    fontFamily='"NanumSquare Neo"'
    fontSize="1rem"
    fontStyle="normal"
    fontWeight="800"
    lineHeight="1.375rem" 
    letterSpacing="-0.01rem"
    px="0.25rem"
    marginBottom="0.56rem"
  >
    {children}
  </Box>
);
