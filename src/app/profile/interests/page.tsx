"use client";
import { Box, Separator } from "@chakra-ui/react";
import { ProfileStepLayout } from "@/components/Layouts/ProfileStepLayout";
import { CheckField } from "@/components/CheckField/CheckField";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useGetBreakPointValue } from "@/context/BreakPointProvider";

export default function InterestsStep() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const CATEGORY_ALL = "전체 선택";
  const CATEGORY_LIST = [
    { id: "health", label: "임신 기간 동안, 임산부의 건강과 관련된 정보를 알고 싶어요." },
    { id: "money", label: "임신, 출산, 육아와 관련된 정책과 지원금 정보를 알고 싶어요." },
    { id: "ready", label: "임신 준비 과정에 필요한 정보를 알고 싶어요." },
    { id: "granulation", label: "출산과 육아에 관한 다양한 정보를 알고 싶어요." },
    { id: "education", label: "임신, 출산 육아와 관련된 교육 프로그램 정보를 알고 싶어요." },
    { id: "mind", label: "임신 기간 동안 정서적인 도움을 줄 수 있는 정보에 대해서 알고 싶어요." },
  ];

  const checkedIds = useCategoryStore((state) => state.checkedIds);
  const toggle = useCategoryStore((state) => state.toggle);
  const toggleAll = useCategoryStore((state) => state.toggleAll);

  const allIds = CATEGORY_LIST.map((c) => c.id);
  const isAllChecked = checkedIds.length === allIds.length;

  const handleNextClick = () => {
    console.log("선택된 카테고리:", checkedIds);
    // 추후 서버 전송 등 추가 로직 작성 가능
  };

  const content = (
    <ProfileStepLayout
      title="관심있는 정보 항목을 눌러주세요"
      description="눌러주신 카테고리를 위주로 준비해드릴게요"
      onNext={handleNextClick}
    >
      <Box>
        <CheckField
          label={CATEGORY_ALL}
          key="all-category"
          checked={isAllChecked}
          onClick={() => toggleAll(allIds)}
        />
      </Box>

      <Separator mt="16px" mb="16px" borderColor="#E8E7E7" height="1px" />

      <Box display="flex" flexDirection="column" gap="12px">
        {CATEGORY_LIST.map((category) => (
          <CheckField
            key={category.id}
            label={category.label}
            checked={checkedIds.includes(category.id)}
            onClick={() => toggle(category.id)}
          />
        ))}
      </Box>
    </ProfileStepLayout>
  );

  return isMobile ? content : content;
}
