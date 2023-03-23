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
      </Routes>
    </div>
  );
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
