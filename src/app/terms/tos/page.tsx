'use client';

import { useEffect, useState } from 'react';
import { Flex, Text, Stack, Skeleton } from '@chakra-ui/react';
import { MobileLayout } from '@/components/Layouts/MobileLayout';
import { Markdown } from '@/components/Markdown/Markdown';

export default function TOSPage() {
  const [md, setMd] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/markdown/terms/TOS.md') 
      .then((res) => {
        if (!res.ok) throw new Error('약관 파일을 불러오지 못했습니다.');
        return res.text();
      })
      .then(setMd)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <MobileLayout
      topbarMode="back"
      topbarTitle="Dear Belly 서비스 이용약관"
      topbarBackground="filled"
      showBottomNav={false}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        w="100%">
        <Flex
          alignItems="center"
          as="article"
          w="100%"
          maxW="33.75rem"
          px="1.125rem"
          py="0.625rem"
          overflowY="auto"
        >
          {error ? (
            <Text color="red.500" fontSize="sm">{error}</Text>
          ) : md ? (
            <Markdown source={md} />
          ) : (
            <Stack gap="3">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} h="1rem" />
              ))}
            </Stack>
          )}
        </Flex>
      </Flex>
    </MobileLayout>
  );
}
