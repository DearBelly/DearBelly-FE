export interface RecommendedInfo {
  newsId: number;
  title: string;
  subTitle: string | null;
  imageUrl: string;
  category: string;
  bookmarked: boolean;
  imgUrl: string;
}
  
export interface RecommendedInfoResponse {
  httpStatus: number;
  message: string;
  data: RecommendedInfo [];
  success: boolean;
}