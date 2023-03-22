/* eslint-disable */ // lint 끄는 기능 (warning 메세지)
//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() { // 컴포넌트

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬 독학']); // 원본 보존하는게 좋음
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false); // 모달창 상태표현
  let [title, setTitle] = useState(0); // state 만드는 곳은 최상위 컴포넌트에 위치
  let [input_e, input_change] = useState('');
  const now = new Date(); // 오늘 날짜
  const dateString = now.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <button onClick={() => { // 가나다순 정렬
        var copy_sort = [...글제목]; // 글제목 COPY
        copy_sort = copy_sort.sort();
        글제목변경(copy_sort);
      }}>가나다순 정렬</button>
      {
        글제목.map(function (a, i) {
          return (
            <div className="list" key={i}>
              <h4 onClick={() => { setModal(!modal); setTitle(i); }}>{글제목[i]}
                <span onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...따봉];
                  copy[i] = copy[i] + 1;
                  따봉변경(copy);
                }}>👍🏻</span> {따봉[i]} </h4>
              <p>{dateString}</p>
              <button onClick={() => {
                let copy = [...글제목];
                copy.splice(i, 1);
                글제목변경(copy);
              }}>삭제</button>
            </div>
          )
        })
      }

      <input onChange={(e) => {
        input_change(e.target.value); // state변경함수는 늦게 처리됨
      }} />
      <button onClick={() => {
        let copy = [...글제목];
        copy.unshift(input_e);
        글제목변경(copy);
      }}>글발행</button>

      {
        modal == true ? <Modal title={title} 글제목변경={글제목변경} 글제목={글제목} /> : null
      }
    </div >
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  )
}

export default App;
