import { useQuery } from "@tanstack/react-query";
import { fetchRecommendNews } from "@/lib/news";
import { NewsItem } from "@/types/news";

export function useNewsQuery(token?: string) {
  return useQuery<NewsItem[]>({
    queryKey: ["news", token],
    queryFn: () => fetchRecommendNews(token),
  });
}
