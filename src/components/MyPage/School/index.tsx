import { box } from './style'

interface SchoolProps {
  degree: string
  graduated: boolean
  major: string
}

const School = (props: SchoolProps) => {
  const myInfo = JSON.stringify(localStorage.getItem('access_token'))
  return (
    <section css={box}>
      <h2>학교정보</h2>
      <p>
        {/* 학위 / 전공 */}
        {props.degree} / {props.major}
      </p>
      {/* 재학여부 */}
      <span className="desc">{props.graduated === true ? <div>졸업</div> : <div>재학중</div>}</span>

      {myInfo ? (
        <button type="button">
          <img src="/images/common/update.svg" alt="수정버튼" />
        </button>
      ) : (
        <div></div>
      )}
    </section>
  )
}

export default School
