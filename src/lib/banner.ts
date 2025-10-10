import { BannerResponse } from "@/types/banner";

export async function fetchBannerInfo(token?: string): Promise<BannerResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/letters/top`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token || process.env.NEXT_PUBLIC_TEMP_TOKEN}`,
      },
    }
  );

  if (!response.ok) throw new Error("배너 정보 조회 오류");

  const json = await response.json();
  return json.data as BannerResponse;
}
