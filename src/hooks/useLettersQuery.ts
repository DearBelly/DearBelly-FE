import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchLettersFeed,
  fetchTodayLetter,
  fetchMonthlyLetters,
  fetchLetterDetail,
  createLetter,
  updateLetter,
  deleteLetter,
} from "@/lib/letters";
import { LettersFeedResponse, MonthlyLettersResponse, TodayLetterResponse } from "@/types/letters";

export function useLettersFeed(cursor?: string, size: number = 20) {
  return useInfiniteQuery<LettersFeedResponse>({
    queryKey: ["lettersFeed", cursor, size],
    queryFn: () => fetchLettersFeed(cursor, size),
    getNextPageParam: (lastPage) => lastPage.nextCursor, 
    initialPageParam: null, 
  });
}

export function useTodayLetter() {
  return useQuery<TodayLetterResponse>({
    queryKey: ["todayLetter"],
    queryFn: fetchTodayLetter,
  });
}

export function useMonthlyLetters(year?: number, month?: number) {
  return useQuery<MonthlyLettersResponse>({
    queryKey: ["monthlyLetters", year, month],
    queryFn: () => fetchMonthlyLetters(year, month),
  });
}

export function useLetterDetail(id: number) {
  return useQuery({
    queryKey: ["letterDetail", id],
    queryFn: () => fetchLetterDetail(id),
  });
}

export function useCreateLetter() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLetter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lettersFeed"] });
      queryClient.invalidateQueries({ queryKey: ["todayLetter"] });
    },
  });
}

export function useUpdateLetter() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) =>
      updateLetter(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lettersFeed"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyLetters"] });
    },
  });
}

export function useDeleteLetter() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLetter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lettersFeed"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyLetters"] });
    },
  });
}
