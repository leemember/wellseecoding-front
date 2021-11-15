import FootButton, { FootButtonType } from 'components/Common/FootButton'
import Back from 'components/Common/Header/Back'
import Title from 'components/Common/Title'
import TextFieldProfile from 'components/Common/TextFieldProfile'
import { css } from '@emotion/react'
import { useState, useCallback } from 'react'
import axios from 'axios'
import { REGISTER_EDUCATION_URL } from 'apis'
import { useEffect } from 'react'
import Head from 'next/head'

type Props = {
  PropDegree: string
  PropMajor: string
  PropGraduated: boolean
}

const SelfIntroduction = ({ PropDegree, PropMajor, PropGraduated }: Props) => {
  // 학위, 전공, 재학 및 졸업여부
  const [degree, setDegree] = useState<string>(PropDegree)
  const [major, setMajor] = useState<string>(PropMajor)
  const [graduated, setGraduated] = useState<boolean>(PropGraduated)
  const [isChecked, setIsChecked] = useState<string>('')

  // 유효성 검사
  const [isDegree, setIsDegree] = useState<boolean>(false)
  const [isMajor, setIsMajor] = useState<boolean>(false)

  useEffect(() => {
    PropDegree.length && setIsDegree(true)
  }, [degree])

  useEffect(() => {
    if (isChecked === '졸업') {
      setGraduated(true)
    } else {
      setGraduated(false)
    }
  }, [isChecked])

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        await axios
          .put(REGISTER_EDUCATION_URL, {
            educations: [
              {
                degree: degree,
                major: major,
                graduated: graduated,
              },
            ],
          })
          .then((res) => {
            if (res.status === 200) {
              location.replace('/mypage')
            }
          })
      } catch (err) {
        console.error(err)
      }
    },
    [degree, major, graduated]
  )

  // 학교를 입력해주세요
  const onChangeDegree = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDegree(e.target.value)

    if (e.target.value.length > 3) {
      setIsDegree(true)
    } else {
      setIsDegree(false)
    }
  }, [])

  // 전공을 입력해주세요
  const onChangeMajor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMajor(e.target.value)

    if (e.target.value.length > 2) {
      setIsMajor(true)
    } else {
      setIsMajor(false)
    }
  }, [])

  // 졸업 체크박스
  const onChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.value)
  }, [])

  return (
    <>
      <Head>
        <title>학교 정보를 적어주세요 </title>
        <meta name="description" content="회원가입 이후 정보 입력 페이지입니다." />
      </Head>
      <Back />

      <Title title="학교 정보를 적어주세요!" className="loginMt" />

      <form css={selfWrap} onSubmit={onSubmit}>
        <TextFieldProfile
          text="학교를 입력해주세요 (4글자 이상)"
          type="text"
          value={degree}
          onChange={onChangeDegree}
        />
        <TextFieldProfile text="전공을 입력해주세요 (3글자 이상)" type="text" value={major} onChange={onChangeMajor} />

        <div className="ingOrEnd" onChange={onChangeValue}>
          <label htmlFor="school-ing">
            <input type="radio" value="재학중" name="school-ing" checked={isChecked === '재학중'} readOnly />
            재학중
          </label>

          <label htmlFor="school-end">
            <input type="radio" value="졸업" name="school-end" checked={isChecked === '졸업'} readOnly />
            졸업
          </label>
        </div>

        <div css={footButtonWrapper}>
          <div className="wrap">
            <FootButton
              type="submit"
              footButtonType={FootButtonType.ACTIVATION}
              disabled={!(isDegree && isMajor && isChecked)}
            >
              다음
            </FootButton>
          </div>
        </div>
      </form>
    </>
  )
}

export default SelfIntroduction

const footButtonWrapper = css`
  position: fixed;
  bottom: 4rem;
  left: 0;
  right: 0;
  padding: 0 20px;
  button:disabled,
  button[disabled] {
    background-color: #d3cfcc;
    color: #ffffff;
  }
  .wrap {
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
    & > button:nth-of-type(1) {
      margin-bottom: 11px;
      margin-top: 20px;
    }
  }
`

const selfWrap = css`
  margin-top: 1.7em;
  padding: 0 20px;
  .ingOrEnd {
    font-size: 20px;
    letter-spacing: -0.6px;
    color: #262626;
    display: flex;
    label {
      display: flex;
      align-items: center;
      &:nth-of-type(1) {
        margin-right: 45px;
      }
      input {
        margin: 0 8px 0 0;
        &:after {
          content: '';
          display: inline-block;
          width: 26px;
          height: 26px;
          border: 1px solid #8b8b8b;
          border-radius: 100%;
          vertical-align: middle;
          cursor: pointer;
        }
        :checked:after {
          border: 1px solid #ff6e35;
          background: #ff6e35;
        }
      }
    }
  }
`
