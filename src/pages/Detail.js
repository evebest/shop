import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Alert, Button, Modal, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addFeeling } from "../store/cartSlice";

function VerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">경고</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>숫자만 입력하세요</h4>
        <p>암튼 숫자만 입력하라구</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
}

// 컴포넌트는 대문자여야 됨...!!
function Detail(props) {
  const [bannerAlert, setBannerAlert] = useState(true);
  // const [inputAlert, setInputAlert] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [tab, setTab] = useState(1);
  const [fade, setFade] = useState("");

  const { id } = useParams();

  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // @@ 배너 2초 동안 띄우기
  useEffect(() => {
    const timer = setTimeout(() => {
      setBannerAlert(false);
    }, 2000);
    // cleanUp functgion이라고 부름. 기존 코드 치우기
    // 보통 타이머/서버에서 데이터 가져올 때 이걸 같이 써줌. 기존 타이머/서버 요청은 제거해주세요~
    // 서버로 데이터 가져오는 데(2초 소요), 데이터 가져오는 도중에 재렌더링이 된다면? 무한 요청 발생!=버그
    return () => {
      //useEffect 시작 전에 실행되는 코드
      clearTimeout(timer);
    };
  }, []); // [] : mount 될 때 1회만 실행됨

  // @@ Detail.js 접속 시 애니메이션 추가
  useEffect(() => {
    const fade = setTimeout(() => {
      setFade("end");
      return () => {
        clearTimeout(fade);
        setFade("");
      };
    }, 100);
  }, [fade]);

  const paramFeeling = props.feeling.find((x) => x.id == id);

  const _inputText = () => {
    if (isNaN(inputValue)) {
      setModalShow(true);
      setInputValue("");
    }
  };

  const _enterPress = (e) => {
    if (e.key === "Enter") _inputText();
  };

  return (
    <div className={`detailContents start ${fade}`}>
      {id > props.feeling.length ? (
        <div>없는 페이지입니다요</div>
      ) : (
        <>
          {bannerAlert === true ? (
            <div className="banner">
              <Alert key="warning" variant="warning">
                2초동안 이뭉솔 얼굴을 바라보면 행복해집니다!
              </Alert>
            </div>
          ) : null}
        </>
      )}
      <div
        className="first"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="detailMain-bg">
          <img
            className="detailImg"
            src={process.env.PUBLIC_URL + paramFeeling.img}
            alt="상품명"
          />
        </div>
        <div className="content" style={{ textAlign: "left" }}>
          <h4>{paramFeeling.title}</h4>
          <h4>{paramFeeling.content}</h4>
          <h4>{paramFeeling.price}</h4>
          <div className="order">
            <input
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => _enterPress(e)}
              className="numberInput"
              type="text"
              placeholder="1"
              value={inputValue}
              style={{ width: "100px" }}
            />
            <button
              onClick={() => {
                dispatch(addFeeling(paramFeeling));
                navigate("/cart");
              }}
            >
              주문하기
            </button>
          </div>
        </div>

        <VerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
      <Nav
        justify
        variant="tabs"
        defaultActiveKey="button1"
        style={{ marginTop: 50 }}
      >
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link-0"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link-1"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(3);
            }}
            eventKey="link-2"
          >
            버튼3
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

function TabContent({ tab }) {
  const [fade, setFade] = useState("");

  useEffect(() => {
    const fade = setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      setFade("");
      clearTimeout(fade);
    };
  }, [tab]);

  return (
    <div className={`start ${fade}`}>
      <div>{tab}번째 내용입니다.</div>
    </div>
  );
}

export default Detail;
