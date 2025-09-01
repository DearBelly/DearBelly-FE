'use client';

import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function PersonalInfoAgree() {
    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);

    // 토큰 체크
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);
  }, []);

    const content_mobile = (
      <>
        <Box>
          {!isLogin && <LoginModal />}
        </Box>
      </>
    );

    return (
      <MobileLayout
        topbarMode="back"
        topbarTitle="개인 정보 수집 동의"
        topbarBackground="filled"
      >
        {content_mobile}
      </MobileLayout>
    );
}
