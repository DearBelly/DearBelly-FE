const API = process.env.NEXT_PUBLIC_API_BASE_URL!;
if (!API) throw new Error("ENV 누락: NEXT_PUBLIC_API_BASE_URL");

const getToken = (): string | undefined => {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem("token") || undefined;
};

export const apiFetch = async (path: string, init: RequestInit = {}) => {
  const token = getToken();
  const hasBody = typeof init.body !== "undefined";

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(hasBody ? { "Content-Type": "application/json" } : {}),
    ...(init.headers as Record<string, string> | undefined),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API}${path}`, {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    let serverMsg = "";
    try {
      serverMsg = await res.text();
    } catch {}
    throw new Error(`${init.method || "GET"} ${path} 실패 (${res.status}) ${serverMsg}`);
  }
  return res;
};

export interface UploadUrlResp {
  putUrl: string;
  objectKey: string;
}

export async function getProfileUploadUrl(filename: string): Promise<UploadUrlResp> {
  const res = await apiFetch(`/api/v1/member/profile/upload-url?filename=${encodeURIComponent(filename)}`);
  const json = await res.json();
  return json.data as UploadUrlResp;
}

export async function putToS3(putUrl: string, file: File): Promise<void> {
  const putRes = await fetch(putUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });
  if (!putRes.ok) throw new Error(`S3 업로드 실패 (${putRes.status})`);
}

export async function commitProfileImage(objectKey: string): Promise<void> {
  await apiFetch(`/api/v1/member/profile/image/commit`, {
    method: "POST",
    body: JSON.stringify({ objectKey }),
  });
}
