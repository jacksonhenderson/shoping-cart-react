import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// dispatch
import { getSaves } from "../../redux/saveProduct/saveProductAction";

//Components
import Product from "../shared/Product";

//Styles
import Styles from "./Saved.module.css";

const Saved = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.savedState);

  useEffect(() => {
    dispatch(getSaves());
  }, []);

  return (
    <main className={Styles.container}>
      {state.length > 0 && (
        <section className={Styles.saves}>
          {state.map((item) => (
            <Product key={item.id} productData={item} />
          ))}
        </section>
      )}

      {state.length === 0 && (
        <div className={Styles.noneSaved}>
          <h2>The stored product is not available!</h2>
        </div>
      )}
    </main>
  );
};

export default Saved;
