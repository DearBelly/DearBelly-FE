"use client";

import { Box, Text, Flex, Separator } from "@chakra-ui/react";
import { InputBoxCalendar } from "@/components/TextField/InputBoxCalendar";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { useRouter } from "next/navigation";
import { useSignupStore } from "@/store/useSignupStore";
import { MinorCheckField } from "@/components/CheckField/MinorCheckField";
import { RadioField } from "@/components/RadioField/RadioField";
import { useState } from "react";

export default function InfoStep() {
  const router = useRouter();

  const nextStep = useSignupStore((state) => state.nextStep);
  const setData = useSignupStore((state) => state.setData);
  const nickname = useSignupStore((state) => state.data.nickname);
  const isExpectingMother = useSignupStore(
    (state) => state.data.isExpectingMother
  );
  const LMP = useSignupStore((state) => state.data.LMP);
  const birth = useSignupStore((state) => state.data.birth);

  const initialUserType = useSignupStore((state) => state.data.isPregnant ? 0 : 1);
  const [userType, setUserType] = useState<number | null>(initialUserType);

  const [selectedGender, setSelectedGender] = useState<number | null>(null);

  const titleText = `${nickname}에 대해 알려주세요`;
  const subTitleText = "필수 항목을 입력하고 맞춤 소식을 받아요";

  const userTypeOptions = ["임산부", "보호자"];
  const userTypeMap = ["PREGNANT", "GUARDIAN"];

  const genderOptions = ["여성", "남성", "기타"];
  const genderMap = ["FEMALE", "MALE", "UNKNOWN"];

  const handleExpectingMother = () => {
    setData({ isExpectingMother: !isExpectingMother });
  };

  const handleNextClick = () => {
    if (userType !== null) {
      setData({ isPregnant: userTypeMap[userType] === "PREGNANT" });
    }
    if (selectedGender !== null) {
      setData({ gender: genderMap[selectedGender] });
    }
    nextStep();
    router.push("/profile/interests");
  };  

  const handleBackClick = () => {
    router.push("/profile/setup");
  };

  const isPregnant = userType !== null && userTypeMap[userType] === "PREGNANT";


  return (
    <TopBarBottomButtonLayout
      onNext={handleNextClick}
      nextDisabled={
        userType === null ||
        selectedGender === null ||
        !birth ||
        (isPregnant && !LMP) 
      }
      onBack={handleBackClick}
    >
      <Box w="100%" mt="20px">
        <Text textStyle="head_188001">{titleText}</Text>
        <Text textStyle="body_14400224" mt="4px">
          {subTitleText}
        </Text>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt="5.66dvh"
        width="100%"
        bg="bg.bg3"
        borderRadius="1rem"
      >
        <Box px="1rem" py="0.75rem" w="100%" gap="0.25rem">
          <Flex h="1.375rem" alignItems="center">
            <Text textStyle="caption_12800">관계 선택</Text>
          </Flex>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {userTypeOptions.map((label, idx) => (
              <RadioField
                key={idx}
                label={label}
                checked={userType === idx}
                onClick={() => setUserType(idx)}
              />
            ))}
          </Box>
        </Box>

        {isPregnant && (
          <Box pb="10px" px="16px" w="100%">
            <MinorCheckField
              label="예비 임산부입니다"
              checked={isExpectingMother}
              onClick={handleExpectingMother}
            />
          </Box>
        )}

        {isPregnant && (
          <>
            <Box px="16px" w="100%">
              <Separator
                w="100%"
                borderColor="border.border"
                height="1px"
                px="10px"
              />
            </Box>

            <InputBoxCalendar
              mode="transparent"
              title="마지막 생리 시작일"
              placeholder="0000-00-00"
              onChange={(date) =>
                setData({ LMP: date ? date.toISOString().split("T")[0] : "" })
              }
            />
          </>
        )}

        <Box px="16px" w="100%">
          <Separator
            w="100%"
            borderColor="border.border"
            height="1px"
            px="10px"
          />
        </Box>

        <Box px="1rem" py="0.75rem" w="100%" gap="0.25rem">
          <Flex h="1.375rem" alignItems="center">
            <Text textStyle="caption_12800">성별</Text>
          </Flex>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {genderOptions.map((label, idx) => (
              <RadioField
                key={idx}
                label={label}
                checked={selectedGender === idx}
                onClick={() => setSelectedGender(idx)}
              />
            ))}
          </Box>
        </Box>

        <Box px="16px" w="100%">
          <Separator
            w="100%"
            borderColor="border.border"
            height="1px"
            px="10px"
          />
        </Box>

        <InputBoxCalendar
          mode="transparent"
          title="생년월일"
          placeholder="0000-00-00"
          onChange={(date) =>
            setData({ birth: date ? date.toISOString().split("T")[0] : "" })
          }
        />
      </Box>
    </TopBarBottomButtonLayout>
  );
}
