export interface Banner {
  babyName: string;
  week: number;
  hasUnreadLetters: boolean;
}

export interface BannerResponse {
  httpStatus: number;
  message: string;
  data: Banner [];
  success: boolean;
}