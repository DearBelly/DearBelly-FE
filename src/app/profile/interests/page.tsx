"use client";

import { Box, Separator, Text, useToken } from "@chakra-ui/react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { CheckField } from "@/components/CheckField/CheckField";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useRouter } from "next/navigation";

export default function InterestsStep() {
  const router = useRouter();

  const categories = useCategoryStore((s) => s.categories);
  const checkedIds = useCategoryStore((s) => s.checkedIds);

  const toggle = useCategoryStore((s) => s.toggle);
  const toggleAll = useCategoryStore((s) => s.toggleAll);

  const isAllChecked = useCategoryStore((s) => s.isAllChecked());
  const isAnyChecked = useCategoryStore((s) => s.isAnyChecked());

  const handleNextClick = () => {
    router.push("/profile/family");
  };

  const [borderColor] = useToken("colors", ["border.border"]);

  return (
    <TopBarBottomButtonLayout onNext={handleNextClick} nextDisabled={!isAnyChecked}>
      <Box as="form" w="100%" mt="20px" onSubmit={(e) => {
        e.preventDefault();
        handleNextClick();
      }}>
        <Text textStyle="head_188001">관심있는 정보 항목을 눌러주세요</Text>
        <Text textStyle="body_14400224" mt="4px">
          눌러주신 카테고리를 위주로 준비해드릴게요
        </Text>
      </Box>

      <Box mt="5.66dvh">
        <CheckField
          label="전체 선택"
          checked={isAllChecked}
          onClick={toggleAll}
        />
      </Box>

      <Separator mt="16px" mb="16px" borderColor={borderColor} height="1px" />

      <Box display="flex" flexDirection="column" gap="12px">
        {categories.map((c) => (
          <CheckField
            key={c.id}
            label={c.label}
            checked={checkedIds.includes(c.id)}
            onClick={() => toggle(c.id)}
          />
        ))}
      </Box>
    </TopBarBottomButtonLayout>
  );
}
