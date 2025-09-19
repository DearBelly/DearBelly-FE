export type UserProfile = {
  nickname: string;
  gender: "MALE" | "FEMALE" | "UNKNOWN";
  birth: string; // yyyy-mm-dd
  isPregnant: boolean;
  lmpDate?: string;
  pre_pregnant?: boolean;
  interests: string[];
  imageUrl?: string;
};
  
export type EditProfileRequest = {
  nickname: string;
  lmpDate: string;
};
  
export type UpdateCategoriesRequest = {
  interests: string[];
};
  
export type PresignedUrlResponse = {
  putUrl: string;
  objectKey: string;
};
  