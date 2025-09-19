import { BannerInfo } from "@/types/home";

// 홈 상단 배너 조회
export const getBannerInfo = async (): Promise<BannerInfo> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/letters/top`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN}`,
    },
  });
  
  if (!res.ok) throw new Error("배너 조회 실패");
    const json = await res.json();
    return json.data;
};
  