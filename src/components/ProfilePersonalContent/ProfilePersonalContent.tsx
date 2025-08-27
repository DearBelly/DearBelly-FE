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
        color="var(--Text-1, #202020)"
        textOverflow="ellipsis"
        fontFamily='"NanumSquare Neo"'
        fontSize="0.875rem"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="1.5rem"
        letterSpacing="-0.0175rem"
        mr='auto'
      >
        {title}
      </Text>

      <Text
        overflow="hidden"
        color="var(--Text-3, #949393)"
        textAlign="right"
        textOverflow="ellipsis"
        fontFamily='"NanumSquare Neo"'
        fontSize="0.75rem"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="0.875rem"
        letterSpacing="-0.0075rem"
        ml='auto'
      >
        {content}
      </Text>
    </Box>
  );
};
