import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Button } from '@/components/Button'; 
import { useRouter } from 'next/navigation';

// export const LoginModal = ({ onClose }: { onClose: () => void }) => {
export const LoginModal = () => {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/login');
    };

    return (
        <>
        <Box
            className='wrapper'
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
        >
            <Box
                className='modal_wrapper'
                position="relative"
                borderRadius="1.25rem"
                p="1.75rem 1rem 1rem 1rem"
                bg="bg.bg3"
                w="80%"
                maxW="20rem"
                transform="translateY(-50px)"  
            >
                <Box px="2rem" textAlign="center">
                    <Text
                        color="text.text1"
                        textAlign="body_14700120"
                        whiteSpace="normal"      
                        overflow="visible"
                        textOverflow="clip"
                        wordBreak="keep-all"
                    >
                        로그인이 필요한 서비스입니다.
                    </Text>
                </Box>

                <Box
                    display="flex"
                    gap="0.5rem"
                    justifyContent="center"
                    mt="1.5rem"
                    px="0.5rem"
                >
                    <Button type="primary" size="medium" width="100%" onClick={handleLoginClick}>
                        확인
                    </Button>
                </Box>
            </Box>
        </Box>
        </>
    );
};
