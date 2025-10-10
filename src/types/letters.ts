export type ApiResponse<T> = {
  httpStatus: number;
  message: string;
  data: T;
  success: boolean;
};

export type LetterItem = {
  id: number;
  content: string;
  nickname: string;
  imgUrl: string | null;
  isRead: boolean;
  createdAt: string;    
  editable: boolean;
  question: string | null;
}; 

export type LettersFeedData = {
  items: LetterItem[];
  nextCursor: string | null;
};
export type LettersFeedResponse = ApiResponse<LettersFeedData>;

export type TodayLetterData = {
  date: string; 
  questionId: number | null;
  questionText: string | null;
  myLetterId: number | null;
  myLetterContent: string | null;
  canWrite: boolean;
  editable: boolean;
};
export type TodayLetterResponse = ApiResponse<TodayLetterData>;

export type MonthlyLettersData = LetterItem[];
export type MonthlyLettersResponse = ApiResponse<MonthlyLettersData>;

export type LetterDetailData = LetterItem;
export type LetterDetailResponse = ApiResponse<LetterDetailData>;
