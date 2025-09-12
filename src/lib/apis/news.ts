import { recommendNews } from "@/types/recommendNews";

export async function fetchNews(): Promise<recommendNews[]> {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No token found");
  
    const res = await fetch("http://43.200.249.9/api/v1/news", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }
  
    const data = await res.json();
    return data.data; 
  }
  