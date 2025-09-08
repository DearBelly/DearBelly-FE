'use client';

import { useState, useEffect } from "react";
import React from 'react'
import { useRouter } from 'next/navigation';
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { ChakraIcons } from "@/utils/withChakraIcon";
import { LoginModal } from '@/components/LoginModal/LoginModal';

// 더미 데이터
const testDataName: string = `한림모사프리드정5밀리그램`;

const testData: string = `
한림모사프리드정5밀리그램은 임산부가 복용해도 안전한 약으로 알려져 있습니다. 하지만, 임신 초기에는 특히 약물에 대한 노출을 최소화하는 것이 좋습니다. 임신 중이거나 임신을 계획 중인 경우, 반드시 의사나 약사와 상의 후 복용해야 합니다.\n\n
주의사항으로는 다음과 같은 것들이 있습니다. 첫째, 이 약은 식사 후 즉시 복용해야 합니다. 둘째, 복용 시에는 알코올을 피해야 합니다. 셋째, 이 약은 장을 자극할 수 있으므로, 장에 문제가 있는 사람들은 복용에 주의해야 합니다. 넷째, 이 약은 혈압을 올릴 수 있으므로, 고혈압 환자들은 복용에 주의해야 합니다. 다섯째, 이 약은 혈당을 올릴 수 있으므로, 당뇨병 환자들은 복용에 주의해야 합니다.\n\n
마지막으로, 이 약에 대한 알레르기 반응이 있었던 사람들은 복용을 피해야 합니다. 이외에도 특정 사람들에게는 다른 부작용이 있을 수 있으므로, 복용 전에 의사나 약사와 상의하는 것이 중요합니다.\n\n
`;

export default function Result() {
  const router = useRouter();
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

  // 더미데이터
  const safe_num: number = 1;

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
        {testData?.trim() ? (
          <>
            <Box
              className="image_wrapper"
              width="calc(100vw - 10rem)"
              maxW="15.625rem"
              mt="1.25rem"
            >
              <img
                src="/images/med.svg"
                style={{ maxWidth: "100%", height: "auto" }}
                alt="약품 이미지"
              />
            </Box>

            <Box w="100%" maxW="33.75rem" mx="auto">
              <Box className="content_wrapper" width="100%" h="100%" mt="1.88rem">
                <Box display="flex" flexDirection="column" gap="10px">
                  <SafeDangerStyle isSafe={safe_num === 1}>
                    {safe_num === 1
                      ? "해당 약품은 복용 시, 안전합니다."
                      : "해당 약품은 복용 시, 위험합니다."}
                  </SafeDangerStyle>

                  <Box className="title_wrapper" display="flex" gap="0.2rem">
                    <MediName>약품명 : {testDataName}</MediName>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column" gap="20px" mt="10px">
                  <MediContent>{parseText(testData)}</MediContent>

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
