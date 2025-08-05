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
    setSelectIndex(newIndex);
    onSelectIndex?.(newIndex);
  }

  // 가로 스크롤 모션을 위해 정의함
  const containerRef = useRef<HTMLDivElement>(null);  // 아이콘들이 들어가는 상자임
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

      {/* 양쪽 끝에 fade 효과 주기 */}
      {/* 왼쪽 */}
      <Box
        position="absolute"
        left="0"
        top="0"
        bottom="0"
        width="5.56vw"
        pointerEvents="none"
        bgGradient="linear(to-r, white, transparent)"
      />

      {/* 오른쪽 */}
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
