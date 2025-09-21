import { Box, Text } from '@chakra-ui/react';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
  onClose: () => void;
}

export const LoginModal = ({ onClose }: LoginModalProps) => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <Box
      className="wrapper"
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex={9999}
      onClick={onClose} 
    >
      <Box
        className="modal_wrapper"
        position="relative"
        borderRadius="1.25rem"
        p="1.75rem 1rem 1rem 1rem"
        bg="bg.bg3"
        maxW="20rem"
        w="100%"
        transform="translateY(-50px)"
        onClick={(e) => e.stopPropagation()} 
      >
        <Box w="100%" textAlign="center">
          <Text color="text.text1" textStyle="body_168001">
            로그인이 필요한 서비스입니다.
          </Text>
        </Box>

        <Box display="flex" justifyContent="center" mt="1.75rem">
          <Button
            type="primary"
            size="medium"
            width="100%"
            onClick={handleLoginClick}
          >
            <Text
              textStyle="caption_12800"
              color="button.button.text.secondary"
            >
              로그인하러 가기
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
