"use client";

import { Skeleton } from "@chakra-ui/react";

export const NoticeCardSkeleton = () => {
  return (
    <Skeleton
      w="150px"
      h="72px"
      borderRadius="16px"
      flex="0 0 auto"
    />
  );
};