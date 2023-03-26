import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';

let YellowBtn = styled.button`
    background : ${props => props.bg};
    color : ${props => props.bg == 'skyblue' ? 'white' : 'black'};
    padding : 10px;
`;

function Detail(props) {

    let { id } = useParams();
    let look_sort = props.shoes.find((x) => x.id == id); // array자료.id == url입력한번호
    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [num, setNum] = useState('');
    let [tab, setTab] = useState(0);
    let [fade2, setFade2] = useState('');

    useEffect(() => {
        let timer = setTimeout(() => { setAlert(false) }, 2000);
        let end2 = setTimeout(() => { setFade2('end') }, 1000);

        return () => {
            clearTimeout(timer);
            setFade2('')
        }
        if (isNaN(num) == true) {
            alert('다시 입력해주십시오.');
        }
    }, [num])

    return (<div className={'container start' + fade2}>
        {
            alert == true ?
                <div className='alert alert-warning'>
                    2초이내 구매시 할인
                </div>
                : null
        }

        {/* <YellowBtn bg="orange">오렌지색 버튼</YellowBtn> */}
        {/* <YellowBtn bg="skyblue">파란색 버튼</YellowBtn> */}
        {count}
        <button onClick={() => {
            setCount(count + 1)
        }}>버튼</button>
        <div className="row">
            <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6">
                <input onChange={(e) => { setNum(e.target.value) }} />
                <h4 className="pt-5">{look_sort.title}</h4>
                <p>{look_sort.content}</p>
                <p>{look_sort.price}원</p>
                <button className="btn btn-danger">주문하기</button>
            </div>
        </div>

        <Nav variant="tabs" defaultActiveKey="link0">
            <Nav.Item>
                <Nav.Link onClick={() => { setTab(0) }} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => { setTab(1) }} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => { setTab(2) }} eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        <TabContent tab={tab} />
    </div>
    )
}
function TabContent({ tab }) {
    let [fade, setFade] = useState('');

    useEffect(() => {
        let end = setTimeout(() => { setFade('end') }, 2000);

        return () => {
            clearTimeout(end)
            setFade('')
        }
    }, [tab])
    // if (tab == 0) {
    // return <div>내용0</div>
    // } else if (tab == 1) {
    // return <div>내용1</div>
    // } else {
    // return <div>내용2</div>
    // }
    return (<div className={'start ' + fade}>
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>)
}

export default Detail;