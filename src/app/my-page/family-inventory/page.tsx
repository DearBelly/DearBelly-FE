'use client';

import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { ProfileList } from '@/components/ProfileList/ProfileList';
import { ProfileListOutput } from '@/components/ProfileList/ProfileListOutput';
import { LoginModal } from '@/components/LoginModal/LoginModal';
import { useUserStore } from "@/store/useUserStore";

export default function familyInventory() {
    // 로그인이 되어있는지, 안 되어 있는지 상태저장
    const [isLogin, setIsLogin] = useState(false);
    // 가족 멤버들을 저장할 수 있도록 상태저장
    const [familyMembers, setFamilyMembers ] = useState<any[]>([]);
    const { token, username, profileImg } = useUserStore();

    // 토큰 체크 && 가족 목록 조회
    useEffect(() => {
      setIsLogin(!!token);

      if(token) {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/family-code/members`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })

        .then((response) => response.json())
        .then((data) => {
            if(data.success) {
                console.log("가족 멤버 목록: ", data.data);
                // 응답을 해당  ProfileListProps형태로 변환
                const formatted = data.data.map((member: any) => ({
                    id: member.id,
                    name: member.nickname,
                    profileSrc: member.imgUrl,
                    mode: "default",
                    isMe: member.isMe || false,
                }));
                setFamilyMembers(formatted);
            }
        })
        .catch((err) => console.error("가족 목록 조회 실패:", err));
      }
    }, []);

    return (
        <MobileLayout
          topbarMode='back'
          topbarTitle='가족 목록'
          topbarBackground='filled'
        >
          <Box className='body_wrapper' display="flex" flexDirection="column" alignItems="center" w="100%" maxW="35rem" mx="auto">
              {/* 본인 프로필  */}
              <Box className='me_wrapper' mt='0.63rem' mb='1.62rem' w="100%">
                  <Text
                      color="text.text1"
                      textStyle="body_1440024"
                      mb='0.31rem'
                      ml='0.5rem'
                  >
                      내 정보
                  </Text>
                  <ProfileList
                      mode='default'
                      name={username}
                      isMe={true}
                      profileSrc={profileImg}
                  />
              </Box>

              <Box className='family_wrapper' w="100%">
                  <Text
                      color="text.text1"
                      textStyle="body_1440024"
                      mb='0.31rem'
                      ml='0.5rem'
                  >
                      소중한 가족들
                  </Text>
                  {familyMembers.length > 0 && <ProfileListOutput cards={familyMembers} />}
              </Box>
              {!isLogin && <LoginModal />}
          </Box>
        </MobileLayout>
      ) 
    }
