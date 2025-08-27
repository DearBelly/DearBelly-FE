/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRouter } from "next/navigation";

export const DropdownMenu = () => {
  const router = useRouter();
  const handleDetailClick = () => {
    router.push(`/mypage/babyEdit`);
  };

  return (
    <div css={menuContainer}>
        <div css={editButton} onClick={handleDetailClick}>수정하기</div>
        <div css={deleteButton}>삭제하기</div>
    </div>
  );
};

const menuContainer = css`
    border-radius: 1rem;
    background: var(--Background-3, #FFF);
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);

    color: var(--Text-1, #202020);
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: "NanumSquare Neo";
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 0.75rem; 
`

const editButton = css`
    position: relative;
    display: flex;
    width: 7.4375rem;
    padding: 0.875rem 1.25rem;
    align-items: center;
    gap: 0.625rem;
    border-radius: 1rem 1rem 0 0;
    background: var(--Background-3, #FFF);

    &:after {
    content: "";
    position: absolute;
    bottom: 0;          
    left: 0.25rem;         
    right: 0.25rem;       
    height: 1.5px;
    background: var(--Border-Border, #E8E7E7);   
  }

    &:hover {
        background: var(--Background-2, #F2F0F0);
    }
`

const deleteButton = css`
    display: flex;
    width: 7.4375rem;
    padding: 0.875rem 1.25rem;
    align-items: center;
    gap: 0.625rem;
    align-self: stretch;
    border-radius: 0 0 1rem 1rem;
    background: var(--Background-3, #FFF);

    &:hover {
        background: var(--Background-2, #F2F0F0);
    }
`