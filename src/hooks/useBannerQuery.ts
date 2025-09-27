import { useQuery } from "@tanstack/react-query";
import { fetchBannerInfo } from "@/lib/banner";
import { BannerResponse } from "@/types/banner";

export function useBannerQuery(token?: string) {
  return useQuery<BannerResponse>({
    queryKey: ["banner", token],
    queryFn: () => fetchBannerInfo(token),
  });
}
