import React from "react";
//Icons
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BlockIcon from "@mui/icons-material/Block";
//Styles
import Styles from "./Order.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";

const Order = ({ order }) => {
  const { itemsCounter, selectedItems, status, total } = order;
  //Width Screen
  const width = window.innerWidth;
  return (
    <section className={Styles.container}>
      <div className={Styles.images}>
        {/* Responsive */}
        <Swiper
          slidesPerView={width < 535 ? 4 : 6}
          spaceBetween={10}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          //Styles Swiper
          style={{
            height: width < 400 ? "110px" : "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {
            //Product pictures
            selectedItems.map((item) => (
              <SwiperSlide>
                <img src={item.image} alt="img" key={item.id} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>

      <div className={Styles.info}>
        <div className={Styles.status}>
          {status ? (
            <>
              <span className={Styles.successful}>Successful payment</span>
              <TaskAltIcon className={Styles.successful} />
            </>
          ) : (
            <>
              <span className={Styles.unsuccessful}>Unsuccessful payment</span>
              <BlockIcon className={Styles.unsuccessful} />
            </>
          )}
        </div>

        <div className={Styles.payments}>
          <p>
            itemsCounter:{" "}
            <span className={Styles.itemsCounter}>{itemsCounter}</span>
          </p>
          <p>
            total: <span className={Styles.total}>{total}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Order;
