import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Dispatch
import { fetchProducts } from "../../../redux/products/productsActions";
import productsOffers from "../../../redux/productsOffers/productsOffersAction";
// Components
import Product from "../../shared/Product";
import Error from "../../shared/Error";
import Loading from "../../shared/Loading";
//Styles
import Styles from "./ProductsOffers.module.css";
// Icons
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
const ProductsOffers = () => {
  const dispatch = useDispatch();
  //Products
  const state = useSelector((state) => state.productsState);
  // Suggested products
  const productsSelected = useSelector(
    (state) => state.productsOffersState.state
  );
  const { products, loading, error } = state;
  //Get the page width
  const width = window.innerWidth;
  //Dispatch Products
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, []);
  //Dispatch Suggested products
  useEffect(() => {
    if (products.length) {
      dispatch(productsOffers(products));
    }
  }, [products]);

  return (
    <div className={Styles.container}>
      {/* Header */}
      <section className={Styles.nav}>
        <span className={Styles.title}>Suggestions</span>
        <Link to="/store" className={Styles.goStore}>
          <DoubleArrowIcon />
          <span className={Styles.title}>store</span>
        </Link>
      </section>
      {/* Loading */}
      {loading && <Loading />}
      {/* Products Slider */}
      {productsSelected && (
        <Swiper
        // Responsive 
          slidesPerView={
            width < 535
              ? 1
              : width < 800
              ? 2
              : width < 1040
              ? 3
              : width < 1430
              ? 4
              : 5
          }
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          style={{ height: "450px" }}
        >
          {/*Products*/}
          {productsSelected.map((item) => (
            <SwiperSlide>
              <Product key={item.id} productData={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {/* Error */}
      {error && <Error error={error} />}
    </div>
  );
};

export default ProductsOffers;
