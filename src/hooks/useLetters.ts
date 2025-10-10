import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  fetchLettersFeed,
  fetchTodayLetter,
  fetchMonthlyLetters,
  fetchLetterDetail,
  createLetter,
  updateLetter,
  deleteLetter,
} from '@/lib/letters';
import type {
  LettersFeedResponse,
  TodayLetterResponse,
  MonthlyLettersResponse,
  LetterDetailResponse,
} from '@/types/letters';

export function useLettersFeed(initialCursor?: string, size = 20) {
  return useInfiniteQuery<LettersFeedResponse>({
    queryKey: ['lettersFeed', size],                       
    queryFn: ({ pageParam }) => fetchLettersFeed(pageParam as string | null, size), 
    getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? undefined,          
    initialPageParam: initialCursor ?? null,
  });
}

export function useTodayLetter() {
  return useQuery<TodayLetterResponse>({
    queryKey: ['todayLetter'],
    queryFn: fetchTodayLetter,
  });
}

export function useMonthlyLetters(year?: number, month?: number) {
  return useQuery<MonthlyLettersResponse>({
    queryKey: ['monthlyLetters', year, month],
    queryFn: () => fetchMonthlyLetters(year, month),
  });
}

export function useLetterDetail(id: number) {
  return useQuery<LetterDetailResponse>({
    queryKey: ['letterDetail', id],
    queryFn: () => fetchLetterDetail(id),
    enabled: Number.isFinite(id),
  });
}

export function useCreateLetter() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createLetter,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['lettersFeed'] });
      qc.invalidateQueries({ queryKey: ['todayLetter'] });
      qc.invalidateQueries({ queryKey: ['monthlyLetters'] });
    },
  });
} 

export function useUpdateLetter() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) => updateLetter(id, content),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['lettersFeed'] });
      qc.invalidateQueries({ queryKey: ['monthlyLetters'] });
      qc.invalidateQueries({ queryKey: ['letterDetail'] });
    },
  });
}

export function useDeleteLetter() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteLetter,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['lettersFeed'] });
      qc.invalidateQueries({ queryKey: ['monthlyLetters'] });
      qc.invalidateQueries({ queryKey: ['todayLetter'] });
    },
  });
}
