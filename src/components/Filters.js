import { Button, Form } from "react-bootstrap";
import Rating from "./Rating";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  sortByPrice,
  filterByStock,
  filterByDelivery,
  filterByRating,
  clearFilters,
} from "../redux/filtersSlice";

const Filters = () => {
  const { byRating, byStock, byFastDelivery, sort } = useSelector(
    (state) => state.filters
  );
  console.log({ byRating, byStock, byFastDelivery, sort });
  const dispatch = useDispatch();
  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() => dispatch(sortByPrice("lowToHigh"))}
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() => dispatch(sortByPrice("highToLow"))}
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() => dispatch(filterByStock())}
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() => dispatch(filterByDelivery())}
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onClick={(i) => dispatch(filterByRating(i + 1))}
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button variant="light" onClick={() => dispatch(clearFilters())}>
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
