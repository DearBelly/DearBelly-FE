'use client';

import { useState, useRef, useEffect } from 'react';
import { TopBarBottomButtonLayout } from '@/components/Layouts/TopBarBottomButtonLayout';
import LetterCard from '@/components/Letter/LetterCard';
import { Box, Text } from '@chakra-ui/react';
import { Calendar } from '@mynaui/icons-react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';

import { LoginModal } from '@/components/LoginModal/LoginModal';
import { fetchMonthlyLetters } from '@/lib/letters';
import type { LetterItem, MonthlyLettersResponse } from '@/types/letters';

export default function LettersPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [letters, setLetters] = useState<LetterItem[]>([]);
  const DEFAULT_PROFILE_IMAGE = '/images/icon_default_profile.svg';
  const DEFAULT_QUESTION = "오늘 하루는 어땠나요?";

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setIsLogin(!!localStorage.getItem('token'));
    sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'token') sync();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    };
    if (calendarOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [calendarOpen]);

  useEffect(() => {
    if (!isLogin) {
      if (isLogin === false) setLetters([]);
      return;
    }

    const ctrl = new AbortController();

    (async () => {
      try {
        const year = selectedMonth.getFullYear();
        const month = selectedMonth.getMonth() + 1;
        const resp: MonthlyLettersResponse = await fetchMonthlyLetters(year, month);
        setLetters(resp.data);
      } catch (err) {
        console.log('편지 조회 오류:', err);
      }
    })();

    return () => ctrl.abort();
  }, [selectedMonth, isLogin]);

  const handleGoWrite = () => {
    if (!localStorage.getItem('token')) return;
    router.push('/letters/new');
  };

  return (
    <TopBarBottomButtonLayout
      topbarTitle="편지함"
      nextLabel="편지쓰러 가기"
      onNext={handleGoWrite}
      onBack={() => router.push('/home')}
    >
      <Box
        w="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box w="100%" position="relative" ref={calendarRef}>
          <Box
            display="flex"
            flexDirection="row"
            gap="4px"
            alignItems="center"
            justifyContent="flex-end"
            color="text.text1"
            pb="8px"
            cursor="pointer"
            onClick={() => setCalendarOpen((prev) => !prev)}
          >
            <Text textStyle="body_14400222">
              {format(selectedMonth, 'yyyy년 M월')}
            </Text>
            <Calendar size={16} />
          </Box>

          {calendarOpen && (
            <Box position="absolute" top="100%" right={0} zIndex={3000} mt="4px">
              <DatePicker
                selected={selectedMonth}
                onChange={(date) => {
                  if (date) setSelectedMonth(date);
                  setCalendarOpen(false);
                }}
                dateFormat="yyyy-MM"
                showMonthYearPicker
                inline
              />
            </Box>
          )}
        </Box>

        <Box display="flex" flexDirection="column" gap="16px" w="100%" maxW="35rem" mt="16px">
          {letters.map((letter) => {
            const href = letter.editable
              ? `/letters/${letter.id}/me`
              : `/letters/${letter.id}/${letter.nickname}`;
            return (
              <Link key={letter.id} href={href} style={{ textDecoration: 'none' }}>
                <LetterCard
                  nickname={letter.nickname}
                  createdAt={letter.createdAt}                 
                  content={letter.content}
                  imgUrl={letter.imgUrl ?? DEFAULT_PROFILE_IMAGE}
                  questionText={letter.question ?? DEFAULT_QUESTION}   
                />
              </Link>
            );
          })}
        </Box>
      </Box>

      {isLogin === false && (
        <LoginModal
          onClose={() => {
            router.push('/home');
          }}
        />
      )}
    </TopBarBottomButtonLayout>
  );
}
