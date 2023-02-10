import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import "./styles.css";

function Product({ prod, fastDelivery }) {
  const cart = useSelector((state) => state.cart);
  // console.log(prod);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(prod));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(prod));
  };

  return (
    <div className="products">
      <Card>
        <Card.Img
          variant="top"
          src={prod.thumbnail}
          alt="product-image"
          className="product-image"
        />
        <Card.Body>
          <Card.Title>{prod.title}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>$ {prod.price}</span>
            {fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>{`${Math.floor(Math.random() * 7) + 2} days delivery`}</div>
            )}
            <Rating rating={Math.floor(prod.rating)} />
          </Card.Subtitle>
          {cart.some((p) => p.item.id === prod.id) ? (
            <Button onClick={handleRemoveFromCart} variant="danger">
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={handleAddToCart}
              variant="primary"
              disabled={!prod.stock}
            >
              {" "}
              {!prod.stock ? "Out of Stock" : "Add To Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
