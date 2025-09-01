'use client';

import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { ProfileList } from '@/components/ProfileList/ProfileList';
import { ProfileListOutput } from '@/components/ProfileList/ProfileListOutput';
import { testData } from '../testData';
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function familyInventory() {
    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);

    // 토큰 체크
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);
    }, []);

    return (
        <MobileLayout
          topbarMode='back'
          topbarTitle='가족 목록'
          topbarBackground='filled'
        >
          <Box className='body_wrapper' display="flex" flexDirection="column" alignItems="center">
              <Box className='me_wrapper' mt='0.63rem' mb='1.62rem'>
                  <Text
                      color="#000"
                      fontFamily="NanumSquare Neo"
                      fontSize="0.875rem"
                      fontWeight="400"
                      lineHeight="1.5rem"
                      letterSpacing="-0.0175rem"
                      mb='0.31rem'
                      ml='0.5rem'
                  >
                      임산부
                  </Text>
                  <ProfileList
                      mode='default'
                      name='김서진'
                      isMe={true}
                  />
              </Box>

              <Box className='me_wrapper'>
                  <Text
                      color="#000"
                      fontFamily="NanumSquare Neo"
                      fontSize="0.875rem"
                      fontWeight="400"
                      lineHeight="1.5rem"
                      letterSpacing="-0.0175rem"
                      mb='0.31rem'
                      ml='0.5rem'
                  >
                      보호자
                  </Text>
                  <ProfileListOutput cards={testData}/>
              </Box>
              {!isLogin && <LoginModal />}
          </Box>
        </MobileLayout>
      ) 
    }
