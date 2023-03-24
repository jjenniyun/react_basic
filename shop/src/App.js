import { useState } from "react";
import './App.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from './data.js';
import Detail from './routes/Detail.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  let [shoes] = useState(data);
  let navigate = useNavigate(); // 페이지 이동

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">FastAnd</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link href="#features">Clothes</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

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
          </>
        } />
        <Route path="/detail" element={<Detail />} />
        <Route path="*" element={<div>404 오류 페이지</div>} />

        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버</div>} />
          <Route path="location" element={<div>위치정보</div>} />
        </Route>

        <Route path="/event" element={<EventPage />}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
          <Route path="two" element={<p>생일기념 쿠폰받기</p>} />
        </Route>
      </Routes>

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
