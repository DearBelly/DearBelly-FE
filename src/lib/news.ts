import { NewsItem } from "@/types/news";

export async function fetchRecommendNews(token?: string): Promise<NewsItem[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token || process.env.NEXT_PUBLIC_TEMP_TOKEN}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) throw new Error("추천 뉴스 조회 오류");

  const json = await response.json();

  if (json.success && Array.isArray(json.data)) {
    return json.data.map((item: any) => ({
      id: item.newsId,
      title: item.title,
      description: item.subTitle,
      imageUrl: item.imageUrl || "/images/default_image.svg",
      href: `/info/detail/${item.newsId}`,
    }));
  }
  return [];
}
