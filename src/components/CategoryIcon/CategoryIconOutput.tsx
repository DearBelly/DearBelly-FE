import React, { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import { CategoryIcon } from "./CategoryIcon";
import type { CategoryIconProps } from './CategoryIcon';
import { Box } from '@chakra-ui/react';

interface CategoryIconOutputProps {
  cards: CategoryIconProps[];

  // 선택된 아이콘의 index를 상위로 전달 
  onSelectIndex ?: (index: number | null) => void;
}

export const CategoryIconOutput = ({ cards, onSelectIndex }: CategoryIconOutputProps) => {
  // 선택된 인덱스를 알기 위해 상태 관리
  const [selectIndex, setSelectIndex] = useState<number | null>(null);

  // if (selectIndex === index) {
  //   setSelectIndex(null);
  // } else{
  //   setSelectIndex(index);
  // }

  const handleClick = (index: number) => {
    const newIndex = selectIndex === index ? null : index;
    setSelectIndex(newIndex);
    // 상위로 전달 
    onSelectIndex?.(newIndex);
  }

  // 가로 스크롤 모션을 위해 정의함
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollX, setScrollX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [, forceUpdate] = useState(false); 

  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;

    const updateScroll = () => {
      setScrollX(ref.scrollLeft);
      setMaxScroll(ref.scrollWidth - ref.clientWidth);
      forceUpdate((prev) => !prev);
    };

    updateScroll(); // 최초 계산

    ref.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);
    return () => {
      ref.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  const getOpacity = (left: number, right: number): number => {
    if (!containerRef.current) return 1;

    const fadeWidth = containerRef.current.clientWidth * 0.0556; // 5.56vw
    const containerLeft = 0;
    const containerRight = containerRef.current.clientWidth;

    // 왼쪽 fade
    if (left < fadeWidth) {
      return Math.max((left - containerLeft) / fadeWidth, 0);
    }

    // 오른쪽 fade
    if (right > containerRight - fadeWidth) {
      return Math.max((containerRight - right) / fadeWidth, 0);
    }

    return 1;
  };

  return (
    <Box position="relative">
      <Box ref={containerRef} css={wrapper}>
        {cards.map((card, index) => {
          const refCallback = (el: HTMLDivElement) => {
            iconRefs.current[index] = el;
          };

          let opacity = 1;
          if (containerRef.current && iconRefs.current[index]) {
            const iconRect = iconRefs.current[index]!.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            const left = iconRect.left - containerRect.left;
            const right = iconRect.right - containerRect.left;
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
                ml={index === 0 ? '5.56vw' : index === cards.length - 1 ? '-2.44vw' : '7vw' }
                style={{ 
                    opacity, 
                    transition: 'opacity 0.5s ease',
                    cursor: index === cards.length - 1 ? 'default' : 'pointer',
                }}
            >
                <CategoryIcon
                    {...card}
                    isSelected={selectIndex === index}
                    onClick={ 
                      index === cards.length - 1 
                      ? undefined 
                      : () => handleClick(index)
                    }
                />
            </Box>
          );
        })}
      </Box>

      {/* 왼쪽 fade 그라데이션 */}
      <Box
        position="absolute"
        left="0"
        top="0"
        bottom="0"
        width="5.56vw"
        pointerEvents="none"
        bgGradient="linear(to-r, white, transparent)"
      />

      {/* 오른쪽 fade 그라데이션 */}
      <Box
        position="absolute"
        right="0"
        top="0"
        bottom="0"
        width="5.56vw"
        pointerEvents="none"
        bgGradient="linear(to-l, white, transparent)"
      />
    </Box>
  );
};

const wrapper = css`
  display: flex;
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
