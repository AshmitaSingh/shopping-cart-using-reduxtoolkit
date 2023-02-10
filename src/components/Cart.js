import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";
import { changeCartQty, removeFromCart } from "../redux/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.item.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="product-container">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.item.id}>
              <Row>
                <Col md={2}>
                  <Image
                    src={prod.item.thumbnail}
                    alt={prod.item.title}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={2}>
                  <span>{prod.item.title}</span>
                </Col>
                <Col md={2}>$ {prod.item.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.item.rating} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch(
                        changeCartQty({
                          id: prod.item.id,
                          qty: e.target.value,
                        })
                      )
                    }
                  >
                    {[...Array(prod.item.stock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => dispatch(removeFromCart(prod.item))}
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ${total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed To Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
