'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Drawer, Box, Flex, Stack, IconButton, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';             
import { Button } from '../Button';
import { CheckField } from '../CheckField/CheckField';
import { ChakraIcons } from '@/lib/withChakraIcon';

const TERMS = [
  { id: 'term1', label: '[필수] 이용약관' },
  { id: 'term2', label: '[필수] 개인정보의 수집 및 이용에 대한 동의' },
  { id: 'term3', label: '[필수] 건강정보 수집 및 이용에 대한 동의' },
] as const;

type TermsState = Record<(typeof TERMS)[number]['id'], boolean>;

const TERM_ROUTES: Record<keyof TermsState, string> = {
  term1: '/terms/tos',
  term2: '/terms/privacy',
  term3: '/terms/health-info',
};

const slideUp   = keyframes`from { transform: translateY(100%);} to { transform: translateY(0); }`;
const slideDown = keyframes`from { transform: translateY(0);}   to { transform: translateY(100%); }`;
const fadeIn    = keyframes`from { opacity: 0; } to { opacity: 0.5; }`;
const fadeOut   = keyframes`from { opacity: 0.5; } to { opacity: 0; }`;

export function TermsSheet() {
  const router = useRouter();

  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [agreements, setAgreements] = useState<TermsState>({
    term1: false,
    term2: false,
    term3: false,
  });

  const allRequiredChecked = useMemo(
    () => TERMS.every((t) => agreements[t.id]),
    [agreements]
  );

  const handleTermClick = (id: keyof TermsState) => {
    setAgreements((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenDetail = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: keyof TermsState
  ) => {
    e.stopPropagation();
    router.push(TERM_ROUTES[id]);
  };

  const handleNext = () => {
    if (!allRequiredChecked) return;
    setIsSheetOpen(false);
  };

  return (
    <Drawer.Root
      open={isSheetOpen}
      onOpenChange={(e) => setIsSheetOpen(e.open)}
      placement="bottom"
      closeOnEscape={false}              
      closeOnInteractOutside={false}
      unmountOnExit={false}           
    >
      <Drawer.Backdrop
        bg="rgba(0, 0, 0, 0.50)"
        css={{
          '&[data-state="open"]':   { animation: `${fadeIn} .2s ease-out` },
          '&[data-state="closed"]': { animation: `${fadeOut} .2s ease-in`  },
        }}
      />
      <Drawer.Content
        roundedTop="1rem"
        bg="bg.bg3"
        px="1.12rem"
        css={{
          '&[data-state="open"]':   { animation: `${slideUp} .25s ease-out` },
          '&[data-state="closed"]': { animation: `${slideDown} .2s ease-in`  },
        }}
      >
        <Drawer.Header
          pt="0.62rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box w="2.5rem" h="5px" bg="gray.300" borderRadius="full" />
        </Drawer.Header>

        <Drawer.Body p="0">
          <Stack w="full" gap="0.62rem" pt="0.62rem" pb="0.94rem">
            {TERMS.map((t) => (
              <Box key={t.id}>
                <Flex align="center" gap="0.5rem" w="full">
                  <CheckField
                    label={t.label}
                    onClick={() => handleTermClick(t.id)}
                    checked={agreements[t.id]}
                  />
                  <Flex ml="auto" align="center">
                    <IconButton
                      aria-label={`${t.label} 상세 보기`}
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleOpenDetail(e, t.id)}
                      _icon={{ boxSize: '1.25rem', color: 'icon.icon1' }}
                    >
                      <ChakraIcons.ChevronRight />
                    </IconButton>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Stack>
        </Drawer.Body>
        <Drawer.Footer 
          p="0" 
          py="0.62rem" 
          px="1.25rem" 
          display="flex" 
          flexDirection="column" 
          alignItems="center"
          >
          <Button 
            type="primary"
            size="large"
            width="100%"
            onClick={handleNext} 
            isDisabled={!allRequiredChecked}>
            <Text 
              textStyle="body_148001"
              color="button.text.secondary"
            >
              동의하고 계속하기
            </Text>
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
}
