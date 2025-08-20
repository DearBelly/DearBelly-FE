'use client'
import { useGetBreakPointValue } from "@/context/BreakPointProvider";
import { MobileLayout } from "@/components/Layouts/MobileLayout";
import { Box, Text } from "@chakra-ui/react";

const Calendar = () => {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;

  const content_mobile = (
    <Box>
      <Text>Calendar</Text>
    </Box>
  );

  return (
    <MobileLayout topBarConfig={{ mode: 'logo' }}>
      {content_mobile}
    </MobileLayout>
  );
};

export default Calendar; 
