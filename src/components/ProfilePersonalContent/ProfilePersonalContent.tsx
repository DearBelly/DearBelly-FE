import { Box, Text } from "@chakra-ui/react";

export interface ProfilePersonalContentProps {
  title: string;
  content: string;
}

export const ProfilePersonalContent = ({ title, content }: ProfilePersonalContentProps) => {
  return (
    <Box 
        display="flex" 
        flexDirection="row" 
        justifyContent="space-between" 
        width="100%"
        alignItems='center'
        margin='0.53rem 0'
    >
      <Text
        overflow="hidden"
        color="text.text1"
        textStyle="body_1440024"
        mr='auto'
      >
        {title}
      </Text>

      <Text
        overflow="hidden"
        color="text.text3"
        textAlign="right"
        textStyle="caption_12400"
        ml='auto'
      >
        {content}
      </Text>
    </Box>
  );
};
