'use client'
import React, {useState} from 'react';
import styled from 'styled-components';
import { Search } from "@mynaui/icons-react";
export interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;  
    onSearch?: (value: string) => void;
    placeholder?: string;
}

export const SearchBox = ({
    value,
    onChange,
    onSearch,
    placeholder = "검색어를 입력해주세요",
  }: SearchBoxProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };
  
    const handleClick = () => {
      if (value.trim() !== "") {
        onSearch?.(value.trim());
      }
    };

    //  enter로도 인식되도록 추가
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim() !== ''){
            onSearch?.(value.trim());
        }
    };
    
    return (
        <SearchBoxWrapper>
            <InputBox placeholder={placeholder} value={value} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
            <SearchButton onClick={handleClick}>
                <Search width={24} height={24} />
            </SearchButton>
        </SearchBoxWrapper>
    );
};

const SearchBoxWrapper = styled.div`
    position: relative;
    display: flex;
    width: calc(100vw - 5rem);
    height: 2rem;
    padding: 0.25rem 0.5rem 0.25rem 0.75rem;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 0;
    border-radius: 6.1875rem;
    background: var(--BG-BG-2, #F2F0F0);
`;

const InputBox = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: #949393;
    font-family: "NanumSquare Neo";
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.5rem;
    letter-spacing: -0.015rem;

    &::placeholder {
        color: #949393;
        text-align: left;
    }
`;

const SearchButton = styled.button`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;