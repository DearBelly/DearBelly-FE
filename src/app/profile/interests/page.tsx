"use client";

import { Box, Separator, Text } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { CheckField } from "@/components/CheckField/CheckField";
import { useSignupStore } from "@/store/useSignupStore"; 
import { useRouter } from "next/navigation";
import { toggleId, toggleAllIds, isAllChecked, isAnyChecked } from "@/utils/selection";

const categoryMap = {
  HEALTH: "임신 기간 동안, 임산부의 건강과 관련된 정보를 알고 싶어요.",
  FINANCIAL: "임신, 출산, 육아와 관련된 정책과 지원금 정보를 알고 싶어요.",
  PREGNANCY_PLANNING: "임신 준비 과정에 필요한 정보를 알고 싶어요.",
  CHILD: "출산과 육아에 관한 다양한 정보를 알고 싶어요.",
  EMOTIONAL: "임신 기간 동안 정서적인 도움을 줄 수 있는 정보에 대해서 알고 싶어요.",
} as const;

type CategoryId = keyof typeof categoryMap;
const categoryIds = Object.keys(categoryMap) as CategoryId[];

export default function InterestsStep() {
  const router = useRouter();
  const { data, setData, nextStep } = useSignupStore();
  const { interestingInformation } = data; 

  const handleToggle = (id: CategoryId) => {
    setData({
      interestingInformation: toggleId(interestingInformation, id),
    });
  };

  const handleToggleAll = () => {
    setData({
      interestingInformation: toggleAllIds(interestingInformation, categoryIds),
    });
  };

  const isAll = isAllChecked(interestingInformation, categoryIds);
  const isAny = isAnyChecked(interestingInformation);

  const handleNextClick = () => {
    nextStep();
    router.push("/profile/family");
  };

  const handleBackClick = () => {
    router.push("/profile/info");
  };

  return (
    <TopBarBottomButtonLayout onNext={handleNextClick} nextDisabled={!isAny} onBack={handleBackClick}>
      <Box pt="20px" w="100%">
        <Text textStyle="head_188001">관심있는 정보 항목을 눌러주세요</Text>
        <Text textStyle="body_14400224" mt="4px">
          눌러주신 카테고리를 위주로 준비해드릴게요
        </Text>
      </Box>

      <Box pt="5.66dvh" w="100%">
        <CheckField
          label="전체 선택"
          checked={isAll}
          onClick={handleToggleAll}
        />

        <Separator w="100%" my="1rem" borderColor="border.border" height="1px" px="20px"/>

        <Box display="flex" flexDirection="column" gap="12px">
          {categoryIds.map((id) => (
            <CheckField
              key={id}
              label={categoryMap[id]}
              checked={interestingInformation.includes(id)}
              onClick={() => handleToggle(id)}
            />
          ))}
        </Box>
      </Box>
    </TopBarBottomButtonLayout>
  );
}
