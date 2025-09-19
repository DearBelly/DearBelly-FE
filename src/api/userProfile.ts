import { UserProfile, EditProfileRequest, UpdateCategoriesRequest, PresignedUrlResponse } from "@/types/UserProfile";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const getToken = () => localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;

const headers = {
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
};

// 1. 회원 정보 조회
export const getProfile = async (): Promise<UserProfile> => {
  const res = await fetch(`${API_BASE}/api/v1/member/profile`, {
    method: "GET",
    headers,
  });
  if (!res.ok) throw new Error("회원 정보 조회 실패");
  return (await res.json()).data;
};

// 2. 회원 정보 등록
export const registerProfile = async (profile: UserProfile) => {
  const params = new URLSearchParams({
    nickname: profile.nickname,
    isPregnant: String(profile.isPregnant),
    gender: profile.gender,
    birth: profile.birth,
    ...(profile.lmpDate && { lmpDate: profile.lmpDate }),
    ...(profile.pre_pregnant !== undefined && { pre_pregnant: String(profile.pre_pregnant) }),
  });

  profile.interests.forEach((cat) => params.append("categories", cat));

  const res = await fetch(`${API_BASE}/api/v1/member/profile?${params}`, {
    method: "POST",
    headers,
  });
  if (!res.ok) throw new Error("회원 등록 실패");
  return res.json();
};

// 3. 회원 정보 수정
export const updateProfile = async (body: EditProfileRequest) => {
  const res = await fetch(`${API_BASE}/api/v1/member/profile/edit`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("회원 정보 수정 실패");
  return res.json();
};

// 4. 관심 카테고리 수정
export const updateInterests = async (body: UpdateCategoriesRequest) => {
  const res = await fetch(`${API_BASE}/api/v1/member/profile/categories`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("관심사 수정 실패");
  return res.json();
};

// 5. 업로드용 Presigned URL 받기
export const getUploadUrl = async (filename: string): Promise<PresignedUrlResponse> => {
  const res = await fetch(`${API_BASE}/api/v1/member/profile/upload-url?filename=${filename}`, {
    method: "GET",
    headers,
  });
  if (!res.ok) throw new Error("업로드 URL 발급 실패");
  return (await res.json()).data;
};

// 6. 이미지 저장 확정
export const commitImage = async (objectKey: string) => {
  const res = await fetch(`${API_BASE}/api/v1/member/profile/image/commit`, {
    method: "POST",
    headers,
    body: JSON.stringify({ objectKey }),
  });
  if (!res.ok) throw new Error("이미지 저장 실패");
  return res.json();
};

// 7. 이미지 리셋
export const resetImage = async () => {
  const res = await fetch(`${API_BASE}/api/v1/member/profile/image`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("이미지 초기화 실패");
  return res.json();
};
