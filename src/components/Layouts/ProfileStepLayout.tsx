/** @jsxImportSource @emotion/react */
"use client";

import styled from "@emotion/styled";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/Button/Button";

interface ProfileStepLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onNext?: () => void;
  nextDisabled?: boolean;
}

export const ProfileStepLayout = ({
  title,
  description,
  children,
  onNext,
  nextDisabled,
}: ProfileStepLayoutProps) => {

  return (
    <>
      <TopBar mode="back" backgroundType="filled" />
      <Container>
        <TitleWrapper>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
        </TitleWrapper>

        <ContentWrapper>{children}</ContentWrapper>

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
    padding-top: 56px; /* AOS 기준 */
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  margin-top: 2.46vh;
`;

const Title = styled.h1`
  color: #202020;
  font-family: "NanumSquare Neo";
  font-size: 18px;
  font-weight: 800;
  line-height: 22px;
  letter-spacing: -0.18px;
`;

const Description = styled.p`
  color: #202020;
  font-family: "NanumSquare Neo";
  font-size: 12px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.24px;
  margin-top: 4px;
`;

const ContentWrapper = styled.div`
  margin-top: 5.66vh;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 1.23vh;
  width: 100%;
  margin-top: auto;
`;
