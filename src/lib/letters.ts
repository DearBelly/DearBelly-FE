const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchLettersFeed(cursor?: string, size: number = 20) {
  const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
  const res = await fetch(`${API}/api/v1/letters/feed?size=${size}${cursor ? `&cursor=${cursor}` : ""}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("편지 피드 조회 실패");
  return res.json();
}

export async function fetchTodayLetter() {
  const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
  const res = await fetch(`${API}/api/v1/letters/today`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("오늘의 질문 조회 실패");
  const json = await res.json();
  return json.data;
}

export async function createLetter(content: string) {
  const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
  const res = await fetch(`${API}/api/v1/letters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("편지 작성 실패");
  return res.json();
}

export async function fetchMonthlyLetters(year?: number, month?: number) {
  const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
  const query = [];
  if (year) query.push(`year=${year}`);
  if (month) query.push(`month=${month}`);
  const res = await fetch(`${API}/api/v1/letters${query.length ? `?${query.join("&")}` : ""}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("편지 월별 조회 실패");
  return res.json();
}

export async function fetchLetterDetail(id: number) {
  const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
  const res = await fetch(`${API}/api/v1/letters/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("편지 상세 조회 실패");
  return res.json();
}

export async function updateLetter(id: number, content: string) {
  const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
  const res = await fetch(`${API}/api/v1/letters/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("편지 수정 실패");
  return res.json();
}

export async function deleteLetter(id: number) {
  const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
  const res = await fetch(`${API}/api/v1/letters/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("편지 삭제 실패");
  return res.json();
}
