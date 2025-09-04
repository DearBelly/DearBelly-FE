export const validateNickname = (
  value: string
): { valid: boolean; guideMessage: string; errorMessage?: string } => {
  const guide = "공백 포함 최대 10자까지 설정할 수 있어요";

  if (value.length === 0) {
    return { valid: false, guideMessage: guide };
  }

  if (value !== value.trim()) {
    return { valid: false, guideMessage: guide, errorMessage: "닉네임은 앞뒤에 공백이 올 수 없어요" };
  }

  const regex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣 ]+$/;
  if (!regex.test(value)) {
    return { valid: false, guideMessage: guide, errorMessage: "닉네임은 영어, 한글, 숫자자만 사용할 수 있어요" };
  }

  return { valid: true, guideMessage: guide };
};
