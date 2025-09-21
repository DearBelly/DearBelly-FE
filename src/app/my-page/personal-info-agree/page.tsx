'use client';

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { LoginModal } from '@/components/LoginModal/LoginModal';
import { useRouter } from 'next/navigation'; 

export default function PersonalInfoAgree() {
  const router = useRouter(); 
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  }, []);

  return (
    <MobileLayout
      topbarMode="back"
      topbarTitle="개인 정보 수집 동의"
      topbarBackground="filled"
    >
      <Box>
        {!isLogin && (
          <LoginModal
            onClose={() => {
              router.push('/my-page'); 
            }}
          />
        )}
      </Box>
    </MobileLayout>
  );
}
