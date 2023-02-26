import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
// import data from "./data";
import axios from "axios";
// #components
import ScrollToTop from "./components/ScrollToTop";
// # pages
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";

function App() {
  const [feeling, setFeeling] = useState([]);
  const [buttonClick, setButtonClick] = useState(0);
  const [list, setList] = useState([
    feeling.slice(0, 1),
    feeling.slice(1, 2),
    feeling.slice(2, 3),
  ]);
  const [loading, setLoading] = useState(true);
  const columnNumber = 3;

  useEffect(() => {
    const load = setTimeout(() => {
      axios
        .get("https://evebest.github.io/src/json/data.json")
        .then((result) => {
          const copied = [...feeling, ...result.data];
          setFeeling(copied);
          setLoading(false);
        })
        .catch(() => {
          console.log("데이터를 불러오는거 실패함 ㅅㄱ");
        });
      clearTimeout(load);
    }, 1000);
  }, []);

  // HTTP 요청, 응답 형태를 JSON으로 자동 변환해줌. 서버는 문자로만 통신이 가능한데 JSON은 문자취급당해서 사용 가능.
  // const getAxios = () => {
  //   axios
  //     .get("https://evebest.github.io/src/json/data.json") // 내 깃헙 웹호스팅 사이트
  //     .then((result) => {
  //       const copied = [...feeling, ...result.data]; //와 이렇게도 된다니..
  //       setFeeling(copied);
  //       // const copiedFeeling = [...feeling];
  //       // const concatedData = copiedFeeling.concat(result.data);
  //       // setFeeling(concatedData);
  //       // console.log(result.data);
  //     })
  //     .catch(() => {
  //       console.log("데이터를 불러오는거 실패함 ㅅㄱ");
  //     });
  // };

  return loading ? (
    <div>
      <h1>불러오는 중입니다..</h1>
    </div>
  ) : (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">이뭉솔나라</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#features">상품</Nav.Link>
            <Nav.Link href="/event">이벤트</Nav.Link>
          </Nav>
          <Nav className="justify-content-end" activeKey="/cart">
            <Nav.Item>
              <Nav.Link href="/cart">장바구니</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      {/* 페이지 나누기*/}
      <div className="contents">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-bg"></div>
                <Container>
                  <Row xs={1} md={3}>
                    {list.map(function (a, i) {
                      return <Card feeling={feeling} index={i} />;
                    })}
                  </Row>
                </Container>
                <div className="buttonMore">
                  {feeling.length - columnNumber * (buttonClick + 1) > 0 ? (
                    <button
                      onClick={() => {
                        const perThree = feeling.slice(
                          columnNumber * (buttonClick + 1),
                          columnNumber * (buttonClick + 1) + 3
                        );
                        const copy = [...list, ...perThree];
                        setList(copy);
                        setButtonClick(buttonClick + 1);
                      }}
                    >
                      ▼ 더보기
                    </button>
                  ) : (
                    <button onClick={ScrollToTop}>맨위로</button>
                  )}
                </div>
              </>
            }
          />
          <Route path="/detail/:id" element={<Detail feeling={feeling} />} />
          <Route path="/event" element={<Event />}>
            <Route path="one" element={<p>지금 주문 시 양배추즙 서비스</p>} />
            <Route path="two" element={<p>생일기념 쿠폰받기</p>} />
          </Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </div>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet />
    </div>
  );
}

function Card(props) {
  // console.log(props);
  const prop = props.feeling[props.index];
  const navigate = useNavigate();

  const onClickImg = () => {
    navigate(`/detail/${prop.id}`);
  };

  return (
    <Col sm onClick={onClickImg}>
      {prop.img ? (
        <img
          className="sub-bg"
          src={process.env.PUBLIC_URL + prop.img}
          alt="상품명"
        />
      ) : (
        <img
          className="sub-bg"
          src={process.env.PUBLIC_URL + "/img/noImage.png"}
          alt="상품명"
        />
      )}
      <h4>{prop.title}</h4>
      <p>{prop.content}</p>
      <p>{prop.price}</p>
    </Col>
  );
}

export default App;
