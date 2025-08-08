'use client'
import React, {useState} from 'react'
import { Box } from "@chakra-ui/react";
import { CategoryIconOutput } from '@/components/CategoryIcon/CategoryIconOutput';
import { useGetBreakPointValue } from "../../../context/BreakPointProvider";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';
import { 
  iconData, 
  testData_all, 
  testData_education,
  testData_preg_all,
  testData_ready,
  testData_health,
  testData_mind,
  testData_money,
} from '../testData';


const InfoInventory = () => {
    const isPc = useGetBreakPointValue();
    const isMobile = !isPc;

    const [selectIndex, setSelectIndex] = useState<number | null>(null);

    // 아이콘의 index를 사용하여 해당 아이콘에서 보여줄 데이터들을 연결하기 위해 정의한 함수임 
    const getInformationData = () => {
      switch (selectIndex) {
        case 0: return testData_education;
        case 1: return testData_preg_all;
        case 2: return testData_ready;
        case 3: return testData_health;
        case 4: return testData_mind;
        case 5: return testData_money;
        default: return testData_all;
      }
    }

    const content_mobile = (
        <Box className='body_wrapper' display="flex" flexDirection="column" alignItems="center">
            {/* 아이콘 카테고리 영역 */}
            <Box className='category_icon_wrapper' height='5.25rem'>
                <CategoryIconOutput cards={iconData} onSelectIndex={setSelectIndex}/>
            </Box>

            {/* 카테고리별 글 목록 영역 */}
            <Box className='inventory_wrapper' width='20.9375rem' margin='0 5.56vw' mt='0.992vh'>
              <ContendCardOutput cards={getInformationData()}/>
            </Box>
        </Box>
    );
    
    return isMobile ? (
        <MobileLayout
          topBarProps={{mode: 'back', title: '알아두면 좋은 정보 모음집'}}
        >
          {content_mobile}
        </MobileLayout>
      ) : (
        <MobileLayout topBarProps={{mode: 'back', title: '알아두면 좋은 정보 모음집'}}>
          {content_mobile}
        </MobileLayout>
      );
    }

export default InfoInventory