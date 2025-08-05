import React, { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import { CategoryIcon } from "./CategoryIcon";
import type { CategoryIconProps } from './CategoryIcon';
import { Box } from '@chakra-ui/react';

interface CategoryIconOutputProps {
  cards: CategoryIconProps[];
  onSelectIndex ?: (index: number | null) => void;
}

export const CategoryIconOutput = ({ cards, onSelectIndex }: CategoryIconOutputProps) => {
  // 선택된 아이콘의 인덱스를 알기 위해 상태 관리
  const [selectIndex, setSelectIndex] = useState<number | null>(null);

  // 아이콘 클릭 시, 이미 선택된 것을 클릭하면 해제(null), 다른 것을 누르면 그것을 선택함
  const handleClick = (index: number) => {
    const newIndex = selectIndex === index ? null : index;
    setSelectIndex(newIndex);  // 선택된 index
    onSelectIndex?.(newIndex); // 부모에게 선택된 index 전달함 
  
    const container = containerRef.current;
    const icon = iconRefs.current[index];  // 클릭한 아이콘 요소
  
    if (container && icon) {
      const containerWidth = container.clientWidth; // 카테고리 아이콘 전체 영역의 가로 길이
      const iconLeft = icon.offsetLeft;  // 아이콘 왼쪽 기준
      const iconWidth = icon.clientWidth; 
  
      // 아이콘이 가운데 오도록 조정 
      const scrollTo = iconLeft - (containerWidth / 2) + (iconWidth / 2);
  
      container.scrollTo({
        left: scrollTo,
        behavior: 'smooth', // 이걸 넣어야 부드럽게 이동 가능함 
      });
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

  const getOpacity = (left: number, right: number): number => {
    const container = containerRef.current;
    if (!container) return 1;

    const fadeWidth = container.clientWidth * 0.0556;
    const containerRight = container.clientWidth;

    if (left < fadeWidth) return Math.max((left) / fadeWidth, 0);
    if (right > containerRight - fadeWidth) return Math.max((containerRight - right) / fadeWidth, 0);

    return 1;
  };

  return (
    <Box position="relative">
      <Box ref={containerRef} css={wrapper}>
      {cards.map((card, index) => {
          const refCallback = (el: HTMLDivElement) => {
            iconRefs.current[index] = el;
          };

          const iconElement = iconRefs.current[index];
          const containerElement = containerRef.current;
          let opacity = 1;

          if (iconElement && containerElement) {
            const iconRect = iconElement.getBoundingClientRect();
            const containerRect = containerElement.getBoundingClientRect();
            const left = iconRect.left - containerRect.left;
            const right = iconRect.right - containerRect.left;
            // 왼/오에 가까워지면 점점 투명하게 보여지도록 설정
            opacity = getOpacity(left, right);
          }
          return (
            <Box
                key={index}
                ref={refCallback}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="5.25rem"
                flexShrink={0}
                ml={index === 0 ? '1.1rem' : '1.45rem' }
                mr={index === cards.length - 1 ? '1.1rem' : 0}
                style={{ 
                    opacity, 
                    transition: 'opacity 0.5s ease',
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
      </Box>

      {/* 양쪽 끝에 fade 효과 주기 위해 추가한 Box임 */}
      {/* 왼쪽 */}
      <Box
        position="absolute"
        left="0"
        top="0"
        bottom="0"
        width="0.3rem"
        pointerEvents="none"
        bgGradient="linear(to-r, #F9F7F7, transparent)"
      />

      {/* 오른쪽 */}
      <Box
        position="absolute"
        right="0"
        top="0"
        bottom="0"
        width="0.3rem"
        pointerEvents="none"
        bgGradient="linear(to-l, #F9F7F7, transparent)"
      />
    </Box>
  );
};

const wrapper = css`
  display: flex;
  width: 22rem;
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
