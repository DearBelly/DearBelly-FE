// 노티스 카드의 캐러셀 기능을 추가
import { useState } from 'react';
import Slider from 'react-slick';
import { css } from '@emotion/react';
import { Box } from '@chakra-ui/react';
import { NoticeBox } from './NoticeBox';
import type { NoticeBoxProps } from './NoticeBox';

interface NoticeCardCarouselProps {
    cards : NoticeBoxProps[];
}

const sliderWrapperStyle = css`
  display: flex;
  justify-content: center;

  .slick-slider {
    width: 21rem; 
  }

  .slick-slide > div {
    display: flex;
    justify-content: center;
  }

  .slick-dots {
    li{
        margin: 0 -0.2rem;
    }
  }

  button:before {
      color: #F2F0F0;    
  }
`;

export const NoticeCardCarousel = ({cards}:NoticeCardCarouselProps) => {
    const initialIndex = Math.floor(cards.length / 2);
    const [currentSlide, setCurrentSlide] = useState(initialIndex);
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '0px',
        slidesToScroll: 1,
        arrows: false,
        initialSlide: initialIndex,
        beforeChange: (_: number, next: number) => setCurrentSlide(next),
    };

    return(
        <Box css={sliderWrapperStyle}>
            <Slider {...settings}>
                {cards.map((card, index) => (
                        <Box 
                            key={index}
                            sx={{
                                opacity: index === currentSlide ? 1 : 0,
                                transition: 'opacity 0.5s ease-in-out',
                                pointerEvents: index === currentSlide ? 'auto' : 'none',
                                display: 'flex',
                                justifyContent: 'center',
                            }}    
                        >
                            <Box width="21rem">
                                <NoticeBox {...card} />
                            </Box>
                        </Box>
                    ))}
            </Slider>
        </Box>
    );
};