'use client';

import React, {useEffect, useState} from 'react'
import { Box } from "@chakra-ui/react";
import { CategoryIconOutput } from '@/components/CategoryIcon/CategoryIconOutput';
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';
import { 
  iconData, 
} from '../testData';

const InfoCategory = () => {
    const [selectIndex, setSelectIndex] = useState<number>(0);
    
    const [items, setItems] = useState<any[]>([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
      if (selectIndex === null) return;

      const token = localStorage.getItem('token');
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news/category/${selectIndex}?page=${page}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept" : "application/json",
        },
      })
      .then(response => response.json())
      .then(data => {
        if(data.success && Array.isArray(data.data.content)) {
          const formatted = data.data.content.map((item: any) => ({
            id: item.newsId,
            title: item.title,
            subTitle: item.subTitle,
            imageSrc: item.imageUrl ?? "/images/default_image.svg",
          }));

          // page마다 append (무한 스크롤)
          setItems(prev => [...prev, ...formatted]);
        }
      })
      .catch(error => console.error("카테고리 연동 실패: ", error));
    }, [selectIndex, page]);
    
    return (
        <MobileLayout
          topbarMode='back'
          topbarTitle='알아두면 좋은 정보 모음집'
        >
          <Box className='body_wrapper' display="flex" flexDirection="column" alignItems="center">
              {/* 아이콘 카테고리 영역 */}
              <Box className='category_icon_wrapper' height='5.25rem'>
                  <CategoryIconOutput 
                    cards={iconData} 
                    onSelectIndex={(idx) => {
                      setSelectIndex(idx ?? 0);
                      setItems([]);
                      setPage(0);
                    }}
                  />
              </Box>

              {/* 카테고리별 글 목록 영역 */}
              <Box className='inventory_wrapper' width='calc(100vw - 2.5rem)' maxW='35rem' mt='0.992vh'>
                <ContendCardOutput cards={items}/>
              </Box>
          </Box>
        </MobileLayout>
    ) 
  }

export default InfoCategory