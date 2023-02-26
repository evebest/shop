import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { plusCount, minusCount, deleteFeeling } from "../store/cartSlice";

function Cart() {
  // Redux store에 있던 state를 가져와 줌.
  const cartState = useSelector((state) => state.cart);

  return (
    <div>
      장바구니 페이지입니다요
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {cartState.map((a, i) => (
            <CartList cart={a} index={i} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

function CartList({ cart, index }) {
  const dispatch = useDispatch();

  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{cart.name}</td>
      <td>
        <button
          onClick={() => {
            dispatch(minusCount(cart.id));
          }}
        >
          -
        </button>
        {cart.count}
        <button
          onClick={() => {
            dispatch(plusCount(cart.id));
          }}
        >
          +
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            dispatch(deleteFeeling(cart.id));
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
}

export default Cart;
