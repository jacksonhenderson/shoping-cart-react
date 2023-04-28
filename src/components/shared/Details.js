import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Components
import Loading from "./Loading";
import Error from "./Error";

//Dispatch
import {
  addItem,
  increase,
  removeItem,
  decrease,
} from "../../redux/cart/cartReduser";

// function
import { quantityCount } from "../../functions/functions";
import { isInCart } from "../../functions/functions";
import { fetchProducts } from "../../redux/products/productsActions";

//Styles
import Styles from "./Details.module.css";

//Icons
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "@mui/material";

const Details = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.productsState);
  const cartState = useSelector((state) => state.cartState);

  const params = useParams();
  //Get the product ID
  const id = params.ID;
  //Get the product
  const product = state.products[id - 1];

  useEffect(() => {
    if (!state.products.length) {
      dispatch(fetchProducts());
    }
  }, []);

  return (
    <div className={Styles.container}>
      {state.loading && <Loading />}

      {state.error && <Error error={state.error} />}

      {state.products.length > 0 && (
        <div>
          <div className={Styles.image}>
            <img src={product.image} />
          </div>

          <div className={Styles.title_description}>
            <div className={Styles.title}>
              <span>{product.title}</span>
            </div>

            <div className={Styles.description}>
              <h4>Description:</h4>
              <p>{product.description}</p>
            </div>
          </div>

          <div className={Styles.flexEnd}>
            <div className={Styles.category}>
              <h4>Category:</h4>
              <p>{product.category}</p>
            </div>

            <div className={Styles.price}>
              <h4>Price:</h4>
              <p>{product.price} $</p>
            </div>

            {/* Display buttons by product number */}
            <div className={Styles.buttonContainer}>
              {quantityCount(cartState, product.id) === 1 && (
                <button
                  className={Styles.smallButton}
                  onClick={() => dispatch(removeItem(product))}
                >
                  <BsFillTrashFill />
                </button>
              )}
              {quantityCount(cartState, product.id) > 1 && (
                <button
                  className={Styles.smallButton}
                  onClick={() => dispatch(decrease(product))}
                >
                  -
                </button>
              )}
              {quantityCount(cartState, product.id) > 0 && (
                <span className={Styles.counter}>
                  {quantityCount(cartState, product.id)}
                </span>
              )}
              {isInCart(cartState, product.id) ? (
                <button
                  className={Styles.smallButton}
                  onClick={() => dispatch(increase(product))}
                >
                  +
                </button>
              ) : (
                <button onClick={() => dispatch(addItem(product))}>
                  Add to Cart
                </button>
              )}
            </div>

            <div className={Styles.buttonBack}>
              <Button sx={{bgcolor: "orange", color: "black"}} onClick={() => window.history.back(-1)}>Back to Shop</Button>
           </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
