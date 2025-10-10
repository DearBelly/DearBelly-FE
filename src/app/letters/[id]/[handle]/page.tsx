'use client';

import { useEffect, useState } from 'react';
import { TopBarBottomButtonLayout } from '@/components/Layouts/TopBarBottomButtonLayout';
import LetterCard from '@/components/Letter/LetterCard';
import { Box } from '@chakra-ui/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { fetchLetterDetail } from '@/lib/letters';
import type { LetterItem, LetterDetailResponse } from '@/types/letters';
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function OthersLetterPage() {
  const router = useRouter();
  const { id, handle } = useParams<{ id: string; handle: string }>();
  const qs = useSearchParams();

  const qsNickname = qs.get('nickname') ?? undefined;
  const qsContent  = qs.get('content') ?? undefined;
  const qsImgUrl   = qs.get('imgUrl') ?? undefined;
  const qsDate     = qs.get('date') ?? undefined;

  const DEFAULT_PROFILE_IMAGE = '/images/icon_default_profile.svg';
  const DEFAULT_QUESTION = "오늘 하루는 어땠나요?";

  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [letter, setLetter] = useState<LetterItem | null>(null);

  useEffect(() => {
    const sync = () => setIsLogin(!!localStorage.getItem('token'));
    sync();
    const onStorage = (e: StorageEvent) => { if (e.key === 'token') sync(); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!id || isLogin !== true) return;

    let cancelled = false;
    (async () => {
      try {
        const resp: LetterDetailResponse = await fetchLetterDetail(Number(id));
        if (!cancelled) setLetter(resp.data);
      } catch (e) {
        console.log('편지 상세 조회 실패:', e);
      }
    })();

    return () => { cancelled = true; };
  }, [id, isLogin]);

  const nickname = letter?.nickname ?? qsNickname ?? (handle || '익명');
  const content  = letter?.content  ?? qsContent  ?? '내용 없음';
  const imgUrl   = letter?.imgUrl   ?? qsImgUrl   ?? DEFAULT_PROFILE_IMAGE;
  const createdAt= letter?.createdAt?? qsDate     ?? ''; 
  const question = letter?.question ?? DEFAULT_QUESTION;        

  return (
    <TopBarBottomButtonLayout topbarTitle="편지함" hideButton>
      <Box
        display="flex"
        flexDirection="column"
        mt="20px"
        w="100%"
        h="100%"
        maxW="35rem"
        alignItems="center"
      >
        <LetterCard
          nickname={nickname}
          createdAt={createdAt}
          content={content}
          imgUrl={imgUrl}
          questionText={question} 
        />
      </Box>

      {isLogin === false && (
        <LoginModal onClose={() => router.push('/home')} />
      )}
    </TopBarBottomButtonLayout>
  );
}
