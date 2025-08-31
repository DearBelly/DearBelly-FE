'use client';

import React, {useState, useEffect, ReactNode} from 'react'
import { Box, Text } from "@chakra-ui/react";
import { SearchBox } from '@/components/Search/SearchBox';
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { SearchInventory } from '@/components/SearchInventory/SearchInventory';
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';
import { testData_all } from '../testData';
import { DangerCircle } from "@mynaui/icons-react";

// 검색어의 id, text를 받음 
interface keyInterface {
    id: number;
    text: string;
}

export default function InfoSearchInventory() {
    // 로컬 스토리지에 저장한 검색어를 관리 
    const [keywords, setKeyWords] = useState<keyInterface[]>([]);
    // 실제 검색 결과
    const [searchResult, setSearchResult] = useState<typeof testData_all>([]);
    // 현재 검색어 상태 저장
    const [currentSearch, setCurrentSearch] = useState<string>("");


    // 최초 마운트 시 localStorage에서 불러오기
    useEffect(() => {
        if (typeof window !== "undefined") {
        const stored = localStorage.getItem("keywords");
        if (stored) {
            setKeyWords(JSON.parse(stored));
        }
        }
    }, []);
    
    // keywords 변경될 때만 localStorage에 저장
    useEffect(() => {
        if (typeof window !== "undefined") {
          if (keywords.length > 0) {
            localStorage.setItem("keywords", JSON.stringify(keywords));
          }
        }
    }, [keywords]);

    // input값이 바뀔 때마다 검색 결과 반영하기
    const handleInputChange = (text:string) => {
        setCurrentSearch(text);

        if(text.trim() === ""){
            setSearchResult([]);
            return;
        }

        // 검색어가 포함된 데이터만 필터링함 
        const filtered = testData_all.filter(
            (item) => item.title.includes(text) || item.description.includes(text)
        );
        setSearchResult(filtered);
    }

    // Enter나 버튼 클릭으로 검색 실행하기 -> keywords에 저정
    const handleAddKeyword = (text: string) => {
        if(!text.trim()) return;

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
        const nextKeyword = keywords.filter((keyword) => { return keyword.id != id; })
        setKeyWords(nextKeyword);
        if (typeof window !== "undefined") {
            localStorage.removeItem("keywords");  
        }
    };

    // 검색어 전체 삭제
    const handleClearKeywords = () => {
        setKeyWords([]); 
        if (typeof window !== "undefined") {
          localStorage.removeItem("keywords");  
        }
    };

    const recentSearchContent = (
        <Box className='body_wrapper' display="flex" flexDirection="column" alignItems="center" margin='0 5.56vw'>
            <Box className='searchInventory_wrapper' width='calc(100vw - 2.5rem)' mt='0.992vh'>
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

    const searchResultContent = (
        <Box className='body_wrapper' display="flex" flexDirection="column" alignItems="center" margin='0 5.56vw'>
            {searchResult.length > 0 ? (
                <Box className='recommend_wrapper' mt='0.92vh' mb='3.704vh'>
                    <ContendCardOutput cards={searchResult} />
                </Box>
            ) : (
                <Box 
                    className="error_wrapper"
                    position="absolute" 
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"  
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"    
                    gap='0.5rem'
                >
                    <DangerCircle size='7vh' color='#DADADA' />
                    <ErrorContent>조회된 정보가 없습니다</ErrorContent>
                </Box>
            )}
        </Box>
    );

    return (
        <MobileLayout
            topbarMode='back'
            topbarBackground='transparent'
            showButtomNav={false} 
            searchbarContent={
                <SearchBox
                    value={currentSearch}
                    onChange={handleInputChange}
                    onSearch={handleAddKeyword}
                />
            }
        >
            {currentSearch === "" ? recentSearchContent : searchResultContent}
        </MobileLayout>
    ) 
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

  export const ErrorContent = ({ children }: { children: ReactNode }) => (
    <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    color="#DADADA"
    fontFamily="NanumSquare Neo"
    fontSize="0.9rem"
    fontStyle="normal"
    fontWeight={700}
    lineHeight="1.25rem"
    letterSpacing="-0.015rem"
    px="1rem"
    maxWidth="90%"

    // 미디어별 한 줄 처리를 위해 추가함 
    whiteSpace="nowrap"
    overflow="hidden"
    textOverflow="ellipsis"
    >
      {children}
    </Box>
);