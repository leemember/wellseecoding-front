import { css } from '@emotion/react'

export const TogetherHeaderSearch = css`
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 40px;
  margin-top: 20px;

  form {
    width: 100%;
  }

  input {
    width: 100%;
    border-bottom: 1.6px solid #ff6e35;
    height: 100%;
    font-weight: 500;
    font-size: 18px;
    background: url('/images/header/search.svg') no-repeat left center;
    padding-left: 23px;
  }
`
