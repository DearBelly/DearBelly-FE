export interface lettersbox {
  id: number;
  content: string;
  nickname: string;
  imgUrl: string | null;
  createdAt: string;
  editable: boolean;
}

export interface GetLettersResponse {
  httpStatus: number;
  message: string;
  data: lettersbox[];
  success: boolean;
}

export async function getLetters(token: string, year?: number, month?: number): Promise<GetLettersResponse> {
  const params = new URLSearchParams();
  if (year) params.append("year", String(year));
  if (month) params.append("month", String(month));
  
  const res = await fetch(`http://43.200.249.9/api/v1/letters?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("편지 조회 실패");
  return res.json();
}
  
export async function getLetterDetail(id: number, token: string): Promise<lettersbox> {
  const res = await fetch(`http://43.200.249.9/api/v1/letters/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("편지 상세 조회 실패");
  const data = await res.json();
  return data.data;
}

export async function editLetter(id: number, body: lettersbox, token: string): Promise<lettersbox> {
  const res = await fetch(`http://43.200.249.9/api/v1/letters/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("편지 수정 실패");
  const data = await res.json();
  return data.data;
}

export async function deleteLetter(id: number, token: string): Promise<lettersbox> {
  const res = await fetch(`http://43.200.249.9/api/v1/letters/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("편지 삭제 실패");
  const data = await res.json();
  return data.data;
}
