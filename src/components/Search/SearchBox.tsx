'use client'
import React, {useState} from 'react';
import styled from 'styled-components';
import { Search } from "@mynaui/icons-react";
export interface SearchBoxProps {
    onSearch?: (value: string) => void;
    placeholder?: string;
}

export const SearchBox = ({onSearch, placeholder = "검색어를 입력해주세요"} : SearchBoxProps) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleClick = () => {
        if(inputValue.trim() !== "") {
            onSearch?.(inputValue.trim());
            setInputValue("");
        }
    };

    //  enter로도 인식되도록 추가
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== ''){
            onSearch?.(inputValue.trim());
            setInputValue('');
        }
    };
    
    return (
        <SearchBoxWrapper>
            <InputBox placeholder={placeholder} value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
            <SearchButton onClick={handleClick}>
                <Search width={24} height={24} />
            </SearchButton>
        </SearchBoxWrapper>
    );
};

const SearchBoxWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
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