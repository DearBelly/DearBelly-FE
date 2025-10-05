'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Spinner, Text } from "@chakra-ui/react";
import { CategoryIconOutput } from '@/components/CategoryIcon/CategoryIconOutput';
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';
import { iconData } from '../testData';

type Item = {
  id: number;
  title: string;
  subTitle: string;
  imageSrc: string;
  bookmark: boolean;
};

const InfoCategory = () => {
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollRootRef = useRef<HTMLDivElement | null>(null);

  const firstPageLoadedRef = useRef(false);

  const fetchList = useCallback(async (category: number, p: number, signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news/category/${category}?page=${p}`;

    try {
      const res = await fetch(url, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          Accept: 'application/json',
        },
        signal,
      });

      const json = await res.json();
      const content = json?.data?.content ?? [];

      if (!Array.isArray(content)) {
        console.warn('content is not array', json);
        setHasMore(false);
        return;
      }

      const list: Item[] = content.map((item: any) => ({
        id: item.newsId,
        title: item.title,
        subTitle: item.subTitle,
        imageSrc: item.imageUrl ?? '/images/default_image.svg',
        bookmark: !!item.bookmarked,
      }));

      console.log(`page=${p}, fetched=${list.length}`);

      setItems(prev => (p === 0 ? list : [...prev, ...list]));

      if (p === 0) firstPageLoadedRef.current = true;

      setHasMore(json?.data?.last === undefined ? list.length > 0 : !json.data.last);

      const root = scrollRootRef.current;
      if (p === 0 && root && root.scrollHeight <= root.clientHeight + 50 && list.length > 0) {
        setPage(prev => prev + 1);
      }

    } catch (e: any) {
      if (e.name !== 'AbortError') {
        console.error('fetch error:', e);
        setError('데이터를 불러오지 못했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    const controller = new AbortController();
    fetchList(selectIndex, page, controller.signal);
    return () => controller.abort();
  }, [selectIndex, page, fetchList]);

  useEffect(() => {
    if (!loaderRef.current) return;
    if (observerRef.current) observerRef.current.disconnect();

    console.log('옵저버 초기화');

    observerRef.current = new IntersectionObserver(
      entries => {
        const first = entries[0];

        if (!firstPageLoadedRef.current) return;
        if (first.isIntersecting && !loading && hasMore) {
          console.log('NEXT PAGE LOAD:', page + 1);
          setPage(prev => prev + 1);
        }
      },
      {
        root: scrollRootRef.current,
        rootMargin: '200px',
        threshold: 0.1,
      }
    );

    observerRef.current.observe(loaderRef.current);
    return () => observerRef.current?.disconnect();
  }, [loading, hasMore, page]);

  const handleSelect = (idx: number | null) => {
    const nextIdx = idx ?? 0;
    setSelectIndex(nextIdx);
    setItems([]);
    setPage(0);
    setHasMore(true);
    setError(null);
    firstPageLoadedRef.current = false;
  };

  return (
    <MobileLayout topbarMode='back' topbarTitle='알아두면 좋은 정보 모음집'>
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* 카테고리 아이콘 */}
        <Box height="5.25rem">
          <CategoryIconOutput cards={iconData} onSelectIndex={handleSelect} />
        </Box>

        {/* 목록 스크롤 영역 */}
        <Box
          ref={scrollRootRef}
          width="calc(100vw - 2.5rem)"
          maxW="35rem"
          overflowY="auto"
        >
          <ContendCardOutput cards={items} />
        </Box>
      </Box>
    </MobileLayout>
  );
};

export default InfoCategory;
