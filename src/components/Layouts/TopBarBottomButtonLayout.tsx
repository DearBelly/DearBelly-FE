/** @jsxImportSource @emotion/react */
"use client";
import styled from "@emotion/styled";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/Button/Button";

interface TopBarBottomButtonLayoutProps {
  children: React.ReactNode;
  onNext?: () => void;
  nextDisabled?: boolean;
}

export const TopBarBottomButtonLayout = ({
  children,
  onNext,
  nextDisabled = true,
}: TopBarBottomButtonLayoutProps) => {

  return (
    <>
      <TopBar mode="back" backgroundType="filled" />
      <Container>
        {children}
        <ButtonWrapper>
          <Button
            type="primary"
            size="large"
            width="100%"
            onClick={onNext}
            isDisabled={nextDisabled}
            aria-label="다음"
          >
            다음
          </Button>
          <BackgroundShadow />
        </ButtonWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  min-width: 360px;
  min-height: 100dvh;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  
  padding-top: 44px; /* iOS 기준 */
  @media (max-width: 360px) {
    padding-top: 56px; /* AOS */
  }
`;

const ButtonWrapper = styled.div`
  z-index: 1;
  width: 100%;
  margin-top: auto;
  padding-top: 1.23dvh;
  padding-bottom: 1.23dvh;
  position: relative;
`;

// 우선 라이트모드 컬러로만 적용
const BackgroundShadow = styled.div`
  z-index: -1;
  position: absolute;
  inset: 0 calc(50% - 50dvw);
  background: linear-gradient(180deg, rgba(249, 247, 247, 0.00) 6.13%, #F9F7F7 58.93%);
`;

