async function uploadAndCommitProfileImage(
  file: File,
  API: string,
  token: string
): Promise<{ objectKey: string }> {
  const filename = encodeURIComponent(file.name);
  const upRes = await fetch(`${API}/api/v1/member/profile/upload-url?filename=${filename}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!upRes.ok) {
    const t = await upRes.text().catch(() => "");
    throw new Error(t || `업로드 URL 발급 실패 (HTTP ${upRes.status})`);
  }

  const upJson = await upRes.json();
  const putUrl: string = upJson?.data?.putUrl;
  const objectKey: string = upJson?.data?.objectKey;
  if (!putUrl || !objectKey) throw new Error("업로드 URL 또는 objectKey가 없습니다.");

  const putHeaders: Record<string, string> = {};
  if (file.type) putHeaders["Content-Type"] = file.type; 
  const putRes = await fetch(putUrl, {
    method: "PUT",
    headers: putHeaders,
    body: file,
  });
  if (!putRes.ok) {
    const t = await putRes.text().catch(() => "");
    throw new Error(t || `S3 업로드 실패 (HTTP ${putRes.status})`);
  }

  const commitRes = await fetch(`${API}/api/v1/member/profile/image/commit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({ objectKey }),
  });
  if (!commitRes.ok) {
    const t = await commitRes.text().catch(() => "");
    throw new Error(t || `이미지 커밋 실패 (HTTP ${commitRes.status})`);
  }

  return { objectKey };
}
