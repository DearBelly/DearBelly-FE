import { css } from '@emotion/react';
import styled from 'styled-components';
import { ClockFiveSolid } from "@mynaui/icons-react";
import { X } from "@mynaui/icons-react";

export interface SearchInventoryProps {
    onClick?: () => void;
    description: string;
}

export const SearchInventory = ({ onClick, description }: SearchInventoryProps) => {
    return (
        <Wrapper>
            <ClockFiveSolid size='1rem'/>
            <Text>{description}</Text>
            <SearchButton onClick={onClick}>
                <X size='1rem'/>
            </SearchButton>
        </Wrapper>

    );
};

const Wrapper = styled.div`
    position: relative;
    width: 20.9rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
`;

const Text = styled.div`
    color: var(--Text-Text-1, #202020);
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: "NanumSquare Neo";
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
    letter-spacing: -0.0125rem;
    margin-left: 0.38rem;
`;

const SearchButton = styled.button`
    margin-left: auto; 
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;