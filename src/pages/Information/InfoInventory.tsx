import React, {useState} from 'react'
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { CategoryIconOutput } from '@/components/CategoryIcon/CategoryIconOutput';
import { useGetBreakPointValue } from "../../context/BreakPointProvider";
import { MobileLayout } from "../../components/Layouts/MobileLayout";
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
} from './testData';


const InfoInventory = () => {
    const isPc = useGetBreakPointValue();
    const isMobile = !isPc;

    const router = useRouter();
    const handleDetailClick = () => {
      router.push('/Information/InformationDetail');
    };

    const [selectIndex, setSelectIndex] = useState<number | null>(null);

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
            {/*  width="calc(100vw - 11.12vw)" */}
            <Box className='category_icon_wrapper' width="100%" height='5.25rem'>
                <CategoryIconOutput cards={iconData} onSelectIndex={setSelectIndex}/>
            </Box>

            <Box className='inventory_wrapper' width='20.9375rem' margin='0 5.56vw' mt='0.992vh'>
              <ContendCardOutput cards={getInformationData()}/>
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