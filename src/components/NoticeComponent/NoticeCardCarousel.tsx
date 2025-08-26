"use client";

import { useState } from "react";
import Slider from "react-slick";
// 이거 이 위치에 넣어주세요!!
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@chakra-ui/react";
import { NoticeBox } from "./NoticeBox";
import type { NoticeBoxProps } from "./NoticeBox";

interface NoticeCardCarouselProps {
  cards: NoticeBoxProps[];
}

export const NoticeCardCarousel = ({ cards }: NoticeCardCarouselProps) => {
  const initialIndex = Math.floor(cards.length / 2);
  const [currentSlide, setCurrentSlide] = useState(initialIndex);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "0px",
    slidesToScroll: 1,
    arrows: false,
    initialSlide: initialIndex,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };

  return (
    <Box
      css={{
        display: "flex",
        justifyContent: "center",
        "& .slick-slider": {
          width: "21rem",
        },
        "& .slick-slide > div": {
          display: "flex",
          justifyContent: "center",
        },
        "& .slick-dots li": {
          margin: "0 -0.2rem",
        },
        "& button:before": {
          color: "#F2F0F0",
        },
      }}
    >
      <Slider {...settings}>
        {cards.map((card, index) => (
          <Box
            key={index}
            opacity={index === currentSlide ? 1 : 0}
            transition="opacity 0.5s ease-in-out"
            pointerEvents={index === currentSlide ? "auto" : "none"}
            display="flex"
            justifyContent="center"
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
