import React, {useState, useEffect} from 'react'
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

// 검색어의 id, text를 받음 
interface keyInterface {
    id: number;
    text: string;
}

export default function InfoSearchInventory() {
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
        };

        // 키워드가 10개 초과가 된다면 가장 첫 번째로 저장되었던 데이터는 삭제되고, 다음으로 입력한 데이터가 들어갈 것임
        let nextKeywords  = [newKeyword, ...keywords];
        if(nextKeywords.length > 10) {
            nextKeywords = nextKeywords.slice(0, 10);
        }

        setKeyWords(nextKeywords);
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
                <Box className='text_wrapper' display="flex" justifyContent="space-between" alignItems="center">
                    <SearchText>최근 검색</SearchText>
                    <DeleteText onClick={handleClearKeywords} disabled={keywords.length===0}>전체 삭제</DeleteText>
                </Box>
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

export const DeleteText = ({ onClick, children, disabled }: { onClick?: () => void; children: React.ReactNode; disabled?:boolean; }) => {
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
        cursor={disabled ? 'default' : 'pointer'}
        _hover={
            disabled ? undefined : { color: '#202020', fontWeight: 600 }
        }
      >
        {children}
      </Text>
    );
  };