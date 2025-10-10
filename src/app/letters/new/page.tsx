'use client';

import { useEffect, useState } from 'react';
import { TopBarBottomButtonLayout } from '@/components/Layouts/TopBarBottomButtonLayout';
import { LetterEditBox } from '@/components/TextField/LetterEditBox';
import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { LoginModal } from '@/components/LoginModal/LoginModal';
import { createLetter, fetchTodayLetter } from '@/lib/letters';
import type { TodayLetterResponse } from '@/types/letters';

export default function NewLetterPage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [questionText, setQuestionText] = useState<string>('오늘의 질문을 불러오는 중이에요…');
  const [canWrite, setCanWrite] = useState<boolean>(true);
  const [myLetterId, setMyLetterId] = useState<number | null>(null);

  const trimmedContent = content.trim();

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
    const loadToday = async () => {
      if (!localStorage.getItem('token')) return;

      try {
        const resp: TodayLetterResponse = await fetchTodayLetter();
        setQuestionText(resp.data.questionText ?? '오늘의 질문이 준비되지 않았어요');
        setCanWrite(resp.data.canWrite);
        setMyLetterId(resp.data.myLetterId ?? null);

      } catch (e) {
        console.log('오늘의 질문 조회 실패:', e);
      }
    };
    loadToday();
  }, []);

  const handleSubmit = async () => {
    if (!localStorage.getItem('token')) return;
    if (!canWrite) {
      if (myLetterId) router.push(`/letters/${myLetterId}/me`);
      return;
    }
    try {
      await createLetter(trimmedContent);
      router.push('/letters');
    } catch (err) {
      console.log('편지 작성 오류:', err);
    }
  };

  return (
    <TopBarBottomButtonLayout
      topbarTitle="편지함"
      nextLabel={canWrite ? '완료' : '수정하기'}
      onNext={handleSubmit}
      nextDisabled={!isLogin || (!canWrite ? false : trimmedContent.length === 0)}
    >
      <Box
        display="flex"
        flexDirection="column"
        mt="20px"
        w="100%"
        maxW="35rem"
        alignItems="center"
        justifyContent="center"
        gap="8px"
      >
        <LetterEditBox value={content} onChange={setContent} questionText={questionText} />

        {!canWrite && myLetterId && (
          <Text textStyle="caption_12400" color="text.text3">
            오늘은 이미 편지를 작성했어요
          </Text>
        )}
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
