import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { displayProducts } from "../redux/productSlice";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import Product from "./Product";
import "./styles.css";
import Filters from "./Filters";

function Home() {
  const dispatch = useDispatch();
  const prod = useSelector((state) => state.products.value);
  // console.log(prod);
  const { byRating, byStock, byFastDelivery, sort, searchQuery } = useSelector(
    (state) => state.filters
  );
  const [fastDelivery, setFastDelivery] = useState(faker.datatype.boolean());

  const fetchProducts = async () => {
    const { data } = await axios.get("https://dummyjson.com/products");
    // console.log(data.products);
    dispatch(displayProducts(data.products));
  };

  const filterProducts = () => {
    // Taking a copy of the Array of Products "prod" and then storing it in another variable
    let sortedProducts = prod.slice();

    // Sort by Ascending/Descending Product Price
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    // Sort by Stock availability - "byStock" is false
    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.stock);
    }

    // Sort by FastDelivery availability
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter(() => fastDelivery);
    }

    // Sort by Rating
    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.rating >= byRating);
    }

    // Sort by keywords
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home">
      <Filters />
      <div className="product-container">
        {filterProducts().map((item) => {
          return (
            <Product prod={item} key={uuidv4()} fastDelivery={fastDelivery} />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
