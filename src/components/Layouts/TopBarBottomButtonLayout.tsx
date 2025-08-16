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
        </ButtonWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: #f9f7f7;
  min-width: 360px;
  min-height: 100vh;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  
  padding-top: 44px; /* iOS 기준 */
  @media (max-width: 360px) {
    padding-top: 56px; /* AOS */
  }
`;

const ButtonWrapper = styled.div`
  margin-bottom: 1.23vh;
  width: 100%;
  margin-top: auto;
  padding-top: 1.23vh;
  background: linear-gradient(180deg, rgba(249, 247, 247, 0) 6.13%, #F9F7F7 58.93%);
`;




