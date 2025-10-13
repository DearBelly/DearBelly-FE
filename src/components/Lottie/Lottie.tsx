"use client";

import React, { useRef, useEffect } from "react";
import Lottie, { AnimationItem, AnimationSegment } from "lottie-web";

interface LottieComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  animationData: any; // 애니메이션 json 주소
  speed?: number; // 재생 속도 
  loop?: boolean; // 반복 
  autoplay?: boolean; // 자동 재생
  segment?: number[]; // 구간 재생
  onComplete?: () => void; // 완료 시 실행
}

const LottieComponent: React.FC<LottieComponentProps> = ({
  animationData,
  speed = 1,
  loop = true,
  autoplay = true,
  style,
  segment,
  onComplete,
  ...restProps
}) => {
  const animationContainer = useRef<HTMLDivElement | null>(null);
  const animationInstance = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!animationContainer.current) return;

    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop,
      autoplay,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet", // 반응형 비율 유지
        progressiveLoad: true,
      },
    });

    animation.setSpeed(speed);

    if (segment) {
      animation.addEventListener("DOMLoaded", () => {
        animation.playSegments(segment as unknown as AnimationSegment[], true); 
      });
    }


    animation.addEventListener("complete", () => {
      if (onComplete) {
        (onComplete as () => void)();
      }
      });

    animationInstance.current = animation;

    return () => {
      animation.destroy();
    };
  }, [animationData, speed, loop, autoplay, segment, onComplete]);

  return (
    <div
      ref={animationContainer}
      style={{
        width: "100%",     
        height: "100%",    
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
      {...restProps}
    />
  );
};

export default LottieComponent;
