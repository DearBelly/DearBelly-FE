'use client';
import { MobileLayout } from "@/components/Layouts/MobileLayout";
import { useGetBreakPointValue } from "@/context/BreakPointProvider";
import styled from "@emotion/styled";

export default function Home() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const content = (

  );

  return isMobile ? (
    <MobileLayout ={{
      mode: 'logo',
      backgroundType: 'filled',
    }}>
      {content}
    </MobileLayout>
  ) : (
    "웹용"
  );
};

const BabyContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;