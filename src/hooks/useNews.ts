import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "@/lib/apis/news";
import { News } from "@/types/news";

export function useNews() {
  return useQuery<News[]>({
    queryKey: ["news"],
    queryFn: fetchNews,
    staleTime: 1000 * 60 * 5,
  });
}
