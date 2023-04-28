import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
//Components
import Loading from "../shared/Loading";
import Error from "../shared/Error";
// function
import { getCookie } from "../../functions/getCookie";
import { fetchUserData } from "../../redux/userData/userDataAction";
//Styles
import Styles from "./Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.userDataState);
  const { user, image, text } = state.data;
  // Cheked login
  useEffect(() => {
    if (!getCookie("token")) navigate("/login");
    if (getCookie("token") || !Object.keys(state.data).length)
      dispatch(fetchUserData(getCookie("token")));
  }, []);

  return (
    <main className={Styles.container}>
      {state.loading && !Object.keys(state.data).length > 0 && !state.error && (
        <div className={Styles.loading}>
          <Loading />
        </div>
      )}

      {Object.keys(state.data).length > 0 && (
        <section className={Styles.profile}>
          <div className={Styles.image}>
            <img src={image} ali="user" />
          </div>

          <div className={Styles.info}>
            <h3>
              Name: <span>{text}</span>
            </h3>
            <h3>
              Email: <span>{user.email}</span>
            </h3>
          </div>

          <div className={Styles.buttonContainer}>
            <div>
              <Link to="/profile/editProfile">EditProfile</Link>
            </div>
          </div>
        </section>
      )}

      {state.error && (
        <div className={Styles.error}>
          <Error error={state.error} />
        </div>
      )}
    </main>
  );
};

export default Profile;
