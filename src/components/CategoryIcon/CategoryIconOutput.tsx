import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { CategoryIcon } from "./CategoryIcon";
import type { CategoryIconProps } from './CategoryIcon';
import { Box } from '@chakra-ui/react';

interface CategoryIconOutputProps {
  cards: CategoryIconProps[];
  onSelectIndex ?: (index: number | null) => void;
}

export const CategoryIconOutput = ({ cards, onSelectIndex }: CategoryIconOutputProps) => {
  // 선택된 아이콘의 인덱스를 알기 위해 상태 관리
  const [selectIndex, setSelectIndex] = useState<number>(0);

  const handleClick = (index: number) => {
     // 이미 선택된 항목이면 무시
    if (selectIndex === index) return;

    setSelectIndex(index);
    onSelectIndex?.(index);

    const container = containerRef.current;
    const icon = iconRefs.current[index];

    if (container && icon) {
      const containerWidth = container.clientWidth;
      const iconLeft = icon.offsetLeft;
      const iconWidth = icon.clientWidth;

      const scrollTo = iconLeft - (containerWidth / 2) + (iconWidth / 2);
      container.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // 가로 스크롤 모션을 위해 정의함
  const containerRef = useRef<HTMLDivElement>(null);  // 카테고리 아이콘들이 들어가는 영역
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [_, forceUpdate] = useState(false);   

  // 스크롤이나 창 크기가 바뀐다면 rerender함 
  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;

    // 아이콘의 위치가 바뀐다면 다시 계산해서 fade효과를 줌
    const updateScroll = () => forceUpdate(prev => !prev); 

    updateScroll();
    ref.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);

    return () => {
      ref.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  return (
    <Box position="relative">
      <Wrapper ref={containerRef}>
      {cards.map((card, index) => {
          const refCallback = (el: HTMLDivElement) => {
            iconRefs.current[index] = el;
          };
          return (
            <Box
                key={index}
                ref={refCallback}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="5.25rem"
                flexShrink={0}
                ml={index === 0 ? '0' : '1.4rem' }
                style={{ 
                    cursor: 'pointer',
                }}
            >
                <CategoryIcon
                    {...card}
                    isSelected={selectIndex === index}
                    onClick={() => handleClick(index)}
                />
            </Box>
          );
        })}
      </Wrapper>
    </Box>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 23rem;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
