"use client";

import { Flex } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { BottomNavigationItem } from './BottomNavigationItem';
import { CalendarSolid, BookOpenSolid, HomeSmileSolid, CenterFocusSolid, UserSquareSolid } from '@mynaui/icons-react';

export const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <Flex
    position="fixed"
    bottom={0}
    left="50%"
    transform="translateX(-50%)" 
    zIndex="1000"
    w="100%"
    maxW="40rem"
    borderRadius="1.25rem 1.25rem 0 0"
    pb="10px"
    bg="bg.bg3"
    h="54px"
    color="border.border"
    borderTop="0.5px solid"
    borderRight="0.5px solid"
    borderLeft="0.5px solid"
    > 
      <Flex
      display="flex"
      alignItems="center"
      flexDirection="row"
      justifyContent="center"
      w="100%"
      >
        <BottomNavigationItem icon={<CalendarSolid />} label="일정" href="/schedule" isActive={pathname === '/schedule'} />
        <BottomNavigationItem icon={<BookOpenSolid />} label="정보" href="/info" isActive={pathname === '/info'} />
        <BottomNavigationItem icon={<HomeSmileSolid />} label="홈" href="/home" isActive={pathname === '/home'} />
        <BottomNavigationItem icon={<CenterFocusSolid />} label="스캔" href="/scan" isActive={pathname === '/scan'} />
        <BottomNavigationItem icon={<UserSquareSolid />} label="마이" href="/my-page" isActive={pathname === '/my-page'} />
      </Flex>
    </Flex>
  );
};