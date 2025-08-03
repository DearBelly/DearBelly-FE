import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";
import { SearchBox } from '@/components/Search/SearchBox';
import { useGetBreakPointValue } from "../../context/BreakPointProvider";
import { MobileLayout } from "../../components/Layouts/MobileLayout";
import { SearchInventory } from '@/components/SearchInventory/SearchInventory';

const TopRightIcons = ({ onSearch }: { onSearch: (text: string) => void }) => (
    <div style={{display:"flex", gap: 0}}>
      <SearchBox onSearch={onSearch}/>
    </div>
);

interface keyInterface {
    id: number;
    text: string;
}

export default function InfoInventory() {
    const isPc = useGetBreakPointValue();
    const isMobile = !isPc;

    // 로컬 스토리지에 저장한 검색어를 관리 
    const [keywords, setKeyWords] = useState<keyInterface[]>([]);

    // 브라우저가 모두 렌더링된 상태에서 함수가 실행할 수 있도록 함 
    useEffect(() => {
        if(typeof window !== 'undefined'){
            const result = localStorage.getItem('keywords') || '[]';
            setKeyWords(JSON.parse(result));
        };
    },[]);

    // keywords 객체를 의존하여, 변경될 경우 새롭게 .localstorage의 아이템 keyword를 세팅 
    useEffect(() => {
        localStorage.setItem('keywords', JSON.stringify(keywords));
    }, [keywords]);

    // 검색어 추가 
    const handleAddKeyword = (text: string) => {
        const newKeyword = {
            id: Date.now(),
            text: text,
        }
        setKeyWords([newKeyword, ...keywords]);
    };

    // 단일 검색어 삭제
    const handleRemoveKeyword = (id: number) => {
        const nextKeyword = keywords.filter((keyword) => {
            return keyword.id != id;
        })
        setKeyWords(nextKeyword);
    };

    // 검색어 전체 삭제
    const handleClearKeywords = () => {
        setKeyWords([]);
    };

    const content_mobile = (
        <Box className='body_wrapper' display="flex" flexDirection="column" alignItems="center" margin='0 5.56vw'>
            <Box className='searchInventory_wrapper' width='20.9rem' mt='0.992vh'>
                {keywords.length > 0 && (
                    <Box className='text_wrapper' display="flex" justifyContent="space-between" alignItems="center">
                        <SearchText>최근 검색</SearchText>
                        <DeleteText onClick={handleClearKeywords}>전체 삭제</DeleteText>
                    </Box>
                )}

                <Box className='inventory_wrapper' mt='0.608vh'>
                    {keywords.map((keyword) => (
                        <SearchInventory
                        key={keyword.id}
                        description={keyword.text}
                        onClick={() => handleRemoveKeyword(keyword.id)}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );

    return isMobile ? (
        <MobileLayout topbarContent={<TopRightIcons onSearch={handleAddKeyword}/>}>
          {content_mobile}
        </MobileLayout>
    ) : (
        <div>Information</div>
    );
}

export const SearchText = ({ children }: { children: React.ReactNode }) => {
    return (
        <Text
            color="var(--Text-Text-1, #202020)"
            fontFamily="NanumSquare Neo"
            fontSize="0.625rem"
            fontStyle="normal"
            fontWeight={700}
            lineHeight="0.75rem"
        >
            {children}
        </Text>
    );
};

export const DeleteText = ({ onClick, children }: { onClick?: () => void; children: React.ReactNode; }) => {
    return (
      <Text
        onClick={onClick}  
        color="var(--Text-Text-2, #6C6B6B)"
        fontFamily="NanumSquare Neo"
        fontSize="0.625rem"
        fontStyle="normal"
        fontWeight={400}
        lineHeight="1.5rem"
        letterSpacing="-0.0125rem"
        cursor="pointer"
        _hover={{
            color: '#202020',
            fontWeight: 600,
        }}
      >
        {children}
      </Text>
    );
  };