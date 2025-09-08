'use client';

import { useState, useEffect } from "react";
import React from 'react'
import { useRouter } from 'next/navigation';
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { ChakraIcons } from "@/utils/withChakraIcon";
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function Result() {
  const router = useRouter();
  
  const [pillName, setPillName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSafeNum, setIsSafeNum] = useState<number | null>(null);
  const [cropImage, setCropImage] = useState<string>("");

  // 저장된 스캔한 알약 데이터 불러오기
  useEffect(() => {
    const stored = sessionStorage.getItem('scanCrop');
    if(stored) {
      try{
        const parsed = JSON.parse(stored);
        const data = parsed?.data;
        if(data) {
          setCropImage(data.cropImage);
        }
        if(data) {
          setPillName(data.pillName);
          setDescription(data.description);
          setIsSafeNum(data.isSafe);
        }
        if(parsed.cropImage) {
          setCropImage(parsed.cropImage);
        }
      }catch (err) {
        console.error('결과 데이터 파싱 오류: ', err);
      }
    }
  },[]);

  const handleScanClick = () => {
    router.push('/scan');
  };

  const parseText = (text: string) => {
    return text.trim().split('\n\n').map((para, i) => (
      <Box key={i}>
        {para.split('\n').map((line, j) => (
          <React.Fragment key={j}>
            {line}
            {j !== para.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </Box>
    ));
  };

  // 로그인 상태
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  }, []);

  return (
    <TopBarBottomButtonLayout
      onNext={handleScanClick}
      nextLabel="다시 스캔하기"
      topbarTitle="분석결과"
      nextDisabled={false}
    >
      <Box
        className="all_wrapper"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        w="100%"
      >
        {pillName?.trim() ? (
          <>
            <Box
              className="image_wrapper"
              width="calc(100vw - 10rem)"
              maxW="15.625rem"
              mt="1.25rem"
              mx="auto"
            >
              <img
                src={cropImage}
                style={{
                  width: "100%",       
                  height: "100%",     
                  objectFit: "cover", 
                  imageRendering: "crisp-edges"
                }}
                alt="약품 이미지"
              />
            </Box>

            <Box w="100%" maxW="33.75rem" mx="auto">
              <Box className="content_wrapper" width="100%" h="100%" mt="1.88rem">
                <Box display="flex" flexDirection="column" gap="10px">
                  <SafeDangerStyle isSafe={isSafeNum === 1}>
                    {isSafeNum === 1
                      ? "해당 약품은 복용 시, 안전합니다."
                      : "해당 약품은 복용 시, 위험합니다."}
                  </SafeDangerStyle>

                  <Box className="title_wrapper" display="flex" gap="0.2rem">
                    <MediName>약품명 : {pillName}</MediName>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column" gap="20px" mt="10px">
                  <MediContent>{parseText(description)}</MediContent>

                  <Box
                    className="warning_wrapper"
                    display="flex"
                    color="text.text3"
                    textStyle="caption_12400"
                    textAlign="justify"
                    mb="1.81rem"
                  >
                    * 본 기능은 참고용으로 제공되며, 결과의 정확도가 100% 보장되지는
                    않습니다. 따라서 약물 복용 여부는 반드시 사용자 본인의 판단과
                    책임하에 결정해 주시기 바랍니다. *
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Box
            className="error_wrapper"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="0.5rem"
          >
            <ChakraIcons.DangerCircle size="7vh" color="text.text4" />
            <ErrorContent>조회한 알약 데이터가 없습니다</ErrorContent>
          </Box>
        )}
        {!isLogin && <LoginModal />}
      </Box>
    </TopBarBottomButtonLayout>
  );
}

interface MediNameProps {
  children: ReactNode;
  fontWeight?: number | string;
}
interface SafeDangerStyleProps {
  children: ReactNode;
  isSafe: boolean;
}

const MediName = ({ children }: MediNameProps) => (
  <Box
    color="text.textt1"
    textStyle="body_14700120"
  >
    {children}
  </Box>
);

const MediContent = ({ children }: { children: ReactNode }) => (
  <Box
    justifyContent="space-around"
    color="text.text1"
    textStyle="body_12400222"
    paddingBottom="0.69rem"
    textAlign="justify"
  >
    {children}
  </Box>
);

const ErrorContent = ({ children }: { children: ReactNode }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    color="text.text4"
    textStyle="body_167001"
    textAlign="justify"
    px="1rem"
    maxWidth="90%"
  >
    {children}
  </Box>
);

const SafeDangerStyle = ({ children, isSafe }: SafeDangerStyleProps) => (
  <Box
    width="fit-content" 
    background={isSafe ? "text.textSafe" : "text.textDanger"}
    color="text.text1"
    textStyle="body_168001"
    px="0.25rem"
    marginBottom="0.56rem"
    borderRadius="0.2rem"
  >
    {children}
  </Box>
);
