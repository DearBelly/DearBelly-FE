"use client"
import React, {useState, useEffect, useRef} from 'react'
import { Box, Text } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../../../context/BreakPointProvider";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';
import { ExternalLink } from "@mynaui/icons-react";
import { Bookmark } from "@mynaui/icons-react";
import { BookmarkSolid } from "@mynaui/icons-react";
import { FunnyCircleSolid } from "@mynaui/icons-react";
import { testData3 } from '../testData';

// 더미데이터
const testData : string = `
**제왕절개 출산의 장단점이 궁금하신가요?**\n\n
우리는 출산 방법에 대해 많은 고민을 합니다. 
특히, 제왕절개 출산은 진통 시간과 회복 기간, 그리고 비용 등 사항을 고려해야 해요. 
이 글을 통해 제왕절개 출산의 장단점을 자세히 알아보겠습니다.\n\n
**제왕절개 출산의 장점**
\n\n제왕절개 출산 방법에는 몇 가지 훌륭한 장점이 존재합니다. 
첫째, 제왕절개의 과정은 출산 시간을 크게 단축시킵니다. 
이를 통해 아기가 진통 중에 위험에 처했을 때 빠르게 아기를 꺼낼 수 있는 상황을 제공해줍니다. 
이는 특히 행동이 제한된 역아나 태반조기박리, 전치태반 등의 경우에서 더욱 중요하게 작용합니다.\n\n
또한, 제왕절개는 주로 배를 통해 진행되기 때문에, 자연분만을 통해 질이나 회음부가 늘어나는 것을 방지할 수 있습니다. 
이를 통해 요실금이 덜 발생할 수 있는 장점이 있습니다.\n\n
**제왕절개 출산의 단점과 주의사항**\n\n
그러나, 제왕절개 출산에는 또한 몇 가지 주의해야 할 사항들이 있습니다. 
첫째, 제왕절개를 한번 했을 경우, 이후에도 계속 제왕절개를 하는 것이 원칙입니다. 이러한 점은 향후 출산 계획이 있다면 고려해볼 사항입니다.\n\n
둘째, 제왕절개는 일반 수술과 마찬가지로 통증과 회복시간을 필요로 합니다. 약 2~3일간 통증으로 인해 행동이 자유롭지 못하며, 산후 회복이 다소 느릴 수 있습니다. 추가적으로 입원기간과 비용에 있어서는 자연분만보다 더 많이 들 수 있는 점으로 인해, 이 점 역시 고려해야 합니다.\n\n
마지막으로 명심해야 할 것은 금방 서트에서 가진 흉터과 바이크의 유착이 가능하다는 점입니다. 이 때문에 수술 부위의 상처 관리는 꼭 필요하며, 질환 발생 가능성 역시 존재합니다.\n\n
**결론**\n\n
제왕절개 출산은 결정하기 전 전문적인 의견을 통해 장단점을 충분히 숙지하고, 개인의 상황과 건강 상태에 맞춰 결정하는 것이 중요합니다. 
본인과 아기의 건강을 최우선으로 하는 선택이 최선일 것입니다.\n\n
`

const InformationDetail = () => {
    const isPc = useGetBreakPointValue();
    const isMobile = !isPc;

    // 본문 데이터 '\n\n' 문단 띄우기, '** ~ **' 강조 (받은 데이터 글 양식 설정) 
    const parseText = (text: string) => {
        return text.split('\n\n').map((para, i) => (
          <TextContent key={i} marginTop={i === 0 ? "0" : "-0.75rem"}>
            {para
              .split(/(\*\*[^*]+\*\*)/g)
              .map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                        <span key={`b-${j}`} style={{ fontWeight: '800', fontSize: '0.875rem', color: 'var(--Text-Text-1, #202020)', lineHeight: '1.125rem', letterSpacing: '-0.0175rem'}}>
                          {part.slice(2, -2)}
                        </span>
                    );
                }

                // 문단 띄우기 ( 첫 번째 문단에서는 위로 띄우는거 없앰) 
                return part.split('\n').map((line, k, arr) => (
                  <React.Fragment key={`${j}-${k}`}>
                    {line}
                    {i !== 0 && <br />}
                  </React.Fragment>
                ));
              })}
          </TextContent>
        ));
    };

    // 이미지 영역보다 스크롤을 아래로 내릴 경우, topbar의 색이 transparent -> filled로 바뀌도록 수정
    const [topbarBG, setTopbarBG] = useState<'transparent' | 'filled'>('transparent');
    const imageRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const imageHeight = imageRef.current?.offsetHeight ?? 200;

            setTopbarBG(scrollY > imageHeight ? 'filled' : 'transparent');
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const content_mobile = (
        <Box className='wrapper1' display="flex" flexDirection="column" alignItems="center" width='100%'>
            {/* 이미지 영역 */}
            <ImageWrapper>
                <img src="/images/image.png" width='100%' height='auto' />
            </ImageWrapper>

            {/* 이미지 영역 아래 글 영역 + 추천 글 목록 영역 */}
            <Box className='wrapper2' margin='0 20px' alignItems='center'>
                {/* 글 제목 영역 */}
                <Box className='title_wrapper'  marginTop='4vh'>
                    <TextTitle>
                        깊이 잠들고 싶은 당신에게 추천하는 5가지 방법
                    </TextTitle>
                    <TextSubTitle>
                        깊은 숙면을 도와주는 5가지 습관
                    </TextSubTitle>
                    <TextDate>
                        2025년04월09일
                    </TextDate>
                </Box>

                {/* 글 내용 영역 */}
                <Box className='content_wrapper' width='100%' marginTop='3vh' as="div">
                    <TextContent>
                        {parseText(testData)}
                    </TextContent>
                </Box>

                {/* 추천 글 목록 영역 */}
                <Box className='recommend_wrapper' width='100%' marginTop='5vh' marginBottom='3vh'>
                    <Box className='title' display='flex' alignItems="center" gap='0.5rem'>
                        <FunnyCircleSolid color='#FF6257'/>
                        <RecommendText >이런 콘텐츠는 어때요?</RecommendText>
                    </Box>
                    <Box className='content'>
                        <ContendCardOutput cards={testData3}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
    
    return isMobile ? (
        <MobileLayout topBarProps={{
            mode: 'back',
            backgroundType: 'transparent',
            firstIcon: <ExternalLink />,
            secondIcon: <Bookmark />,
        }}
        hasTopPadding={false}>
            {content_mobile}
        </MobileLayout>
    ) : (
        <div>InformationDetail</div>
    )
}

const ImageWrapper = ({ children }: { children: React.ReactNode }) => (
    <Box
        position="relative" 
        width='100%'
        height='auto'
    >
        <Box position="relative" zIndex={1}>
            {children}
        </Box>
        <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height= '5.5rem'
            zIndex={1}
            background="linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0))"
        />
    </Box>
)


const TextTitle = ({ children }: { children: React.ReactNode }) => (
    <Text
        color="var(--Text-Text-1, #202020)"
        fontFamily="NanumSquare Neo"
        fontSize="1.125rem"
        fontStyle="normal"
        fontWeight={800}
        lineHeight="1.375rem"
        letterSpacing="-0.01125rem"
    >
        {children}
    </Text>
)

const TextSubTitle = ({ children }: { children: React.ReactNode }) => (
    <Text
        color="var(--Text-Text-2, #6C6B6B)"
        fontFamily="NanumSquare Neo"
        fontSize="0.75rem"
        fontStyle="normal"
        fontWeight={700}
        lineHeight="1rem"
        letterSpacing="-0.0075rem"
        marginTop='1vh'
    >
        {children}
    </Text>
)

const TextDate = ({ children }: { children: React.ReactNode }) => (
    <Text
        color="var(--Text-Text-3, #949393)"
        fontFamily="NanumSquare Neo"
        fontSize="0.5625rem"
        fontStyle="normal"
        fontWeight={700}
        lineHeight="0.6875rem"
        letterSpacing="-0.00563rem"
        marginTop='1.5vh'
    >
        {children}
    </Text>
)

const TextContent = ({ children, marginTop }: { children: React.ReactNode, marginTop?:string }) => (
    <Text
        mt={marginTop}
        color="var(--Text-Text-2, #6C6B6B)"
        fontFamily="NanumSquare Neo"
        fontSize="0.75rem"
        fontStyle="normal"
        fontWeight={400}
        lineHeight="1.5rem"
        letterSpacing="-0.015rem"
    >
        {children}
    </Text>
)

export const RecommendText = ({ children }: { children: React.ReactNode }) => (
    <Text
      as="span"
      color="var(--Text-Text-2, #6C6B6B)"
      fontFamily="NanumSquare Neo"
      fontSize="0.875rem"
      fontStyle="normal"
      fontWeight={600}
      lineHeight="1.25rem"
      letterSpacing="-0.00875rem"
    >
      {children}
    </Text>
)

export default InformationDetail