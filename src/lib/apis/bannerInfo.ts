  export interface BannerInfoResponse {
    httpStatus: number;
    message: string;
    data: number; 
    success: boolean;
  }
  
  export async function writeLetter(
    body: WriteLetterRequest,
    token: string
  ): Promise<WriteLetterResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/letters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(body),
    });
  
    if (!res.ok) {
      throw new Error(`다시 한 번 시도해 주세요: ${res.status}`);
    }
  
    return res.json();
  }