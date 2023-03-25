import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import styled from 'styled-components';

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

    useEffect(() => {
        let timer = setTimeout(() => { setAlert(false) }, 2000);

        return () => {
            clearTimeout(timer);
        }
    }, [])

    return (
        <div className="container">
            {
                alert == true ?
                    <div className='alert alert-warning'>
                        2초이내 구매시 할인
                    </div>
                    : null
            }




            <YellowBtn bg="orange">오렌지색 버튼</YellowBtn>
            <YellowBtn bg="skyblue">파란색 버튼</YellowBtn>
            {count}
            <button onClick={() => {
                setCount(count + 1)
            }}>버튼</button>
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{look_sort.title}</h4>
                    <p>{look_sort.content}</p>
                    <p>{look_sort.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;