import React from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

function Back() {
  const router = useRouter()

  return (
    <header css={backHeader}>
      <button type="button" onClick={() => router.back()}>
        <img src="/images/header/back.svg" alt="뒤로가기" />
      </button>
    </header>
  )
}

export default Back

const backHeader = css`
  width: 100%;
  text-align: left;
`
