import { createContext, useEffect, useState, lazy, Suspense, useTransition, useDeferredValue } from "react";
import './App.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
//import Detail from './routes/Detail.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
//import axios from 'axios';
import { useQuery } from 'react-query'
//import Cart from './routes/Cart.js';
//const Detail = lazy(() => import('./routes/Detail.js'))
//const Cart = lazy(() => import('./routes/Cart.js'))
//import 'bootstrap/dist/css/bootstrap.min.css';

let a = new Array(1000).fill(0)

function App() {

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify([]))
  }, [])

  //console.log(JSON.parse(comeout).name);

  let [shoes, setShoes] = useState(data);
  //let [storage] = useState([10, 11, 12]);
  let navigate = useNavigate(); // 페이지 이동

  let result = useQuery(['작명'], () =>
    axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      console.log('요청됨')
      return a.data
    })
  )

  let [name, setName] = useState('')
  let [isPending, lateacc] = useTransition()
  let state1 = useDeferredValue(name)

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">FastAnd</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link href="#features">Clothes</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <div>
        <input onChange={(e) => {
          lateacc(() => {
            setName(e.target.value)
          })
        }} />
        {
          isPending ? '로딩중' :
            a.map(() => {
              return <div>{state1}</div>
            })
        }
      </div>

      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route path="/" element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return <Card shoes={shoes[i]} i={i} ></Card>
                  })}
                </div>
              </div>
              <button onClick={() => {
                axios.get('https://codingapple1.github.io/shop/data2.json').then((result) => {
                  let copy = [...shoes, ...result.data];
                  setShoes(copy);
                })
                  .catch(() => {
                    console.log('실패')
                  })
              }}>더보기</button>
            </>
          } />

          <Route path="/detail/:id" element={
            <Detail shoes={shoes} />
          } />
          <Route path="*" element={<div>404 오류 페이지</div>} />

          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버</div>} />
            <Route path="location" element={<div>위치정보</div>} />
          </Route>

          <Route path="/event" element={<EventPage />}>
            <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
            <Route path="two" element={<p>생일기념 쿠폰받기</p>} />
          </Route>

          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Suspense>

    </div >
  );
}
function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}
function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  )
}
// 축약하고 싶은 UI 컴포넌트화 하기
function Card(props) { // props 파라미터
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="80%" />
      <h5>{props.shoes.title}</h5>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;