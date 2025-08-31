/** @jsxImportSource @emotion/react */
"use client";
import styled from "@emotion/styled";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/Button/Button";

interface TopBarBottomButtonLayoutProps {
  children: React.ReactNode;
  onNext?: () => void;
  nextDisabled?: boolean;
  // 바텀버튼 안의 문구가 페이지마다 다르기 때문에 props로 받음
  nextLabel?: string;
  // 프로필 변경에서 버튼을 숨길 수 있는 옵션 추가함
  hideButton?: boolean;
  // 탑바 타이틀 줄 수 있게 변경
  topbarTitle?: string;
}

export const TopBarBottomButtonLayout = ({
  children,
  onNext,
  nextDisabled = true,
  // 기본값은 '다음'으로 설정
  nextLabel='다음', 
  hideButton=false,
  topbarTitle,
}: TopBarBottomButtonLayoutProps) => {

  return (
    <>
      <TopBar mode="back" backgroundType="filled" title={topbarTitle}/>
      <Container>
        {children}

        {!hideButton && ( 
          <ButtonWrapper>
            <Button
              type="primary"
              size="large"
              width="100%"
              onClick={onNext}
              isDisabled={nextDisabled}
              aria-label={nextLabel}
            >
              {nextLabel}
            </Button>
            <BackgroundShadow />
          </ButtonWrapper>
        )}
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
  width: calc(100vw - 2.5rem);
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

