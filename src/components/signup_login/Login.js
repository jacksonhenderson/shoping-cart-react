import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//Components
import Loder from "../shared/Loder";
// functions
import { Validate } from "../../functions/validate";
import { getCookie } from "../../functions/getCookie";
// auth
import authentication from "../../services/authentication";
// Styles
import Styles from "./Signup.module.css";
import {
  FormControl,
  Input,
  InputLabel,
  IconButton,
} from "@mui/material";
//Icon
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState();
  const [focuss, setFocuss] = useState({
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  //Validate Data
  useEffect(() => {
    setErrors(Validate(data, "login"));
  }, [data]);
  // Send Data
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      setStatus("loading");
      setStatus(
        await authentication(
          {
            email: data.email,
            password: data.password,
          },
          "login"
        )
      );
      //Cheked Login
      if (getCookie("token")) navigate("/profile");
    } else {
      setFocuss({
        email: true,
        password: true,
      });
    }
  };

  return (
    <main className={Styles.container}>
      <form onSubmit={(e) => submitHandler(e)} className={Styles.formContainer}>
        <h2 className={Styles.header}>Login</h2>
        <FormControl sx={{ minWidth: "230px" }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            value={data.email}
            error={errors.email && focuss.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            onFocus={() => setFocuss({ ...focuss, email: true })}
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl sx={{ minWidth: "230px", mt: "20px" }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            value={data.password}
            error={errors.password && focuss.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            onFocus={() => setFocuss({ ...focuss, password: true })}
            aria-describedby="my-helper-text"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <IconButton onClick={() => setShowPassword(prve => !prve)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
          />
        </FormControl>
        <div className={Styles.formButtons}>
          <Link to="/signUp">SignUp</Link>
          {status === "loading" && <Loder />}
          <button type="submit">Login</button>
        </div>

        {status !== "loading" && status && (
          <div className={Styles.message}>
            <p>{status.message}</p>
          </div>
        )}
      </form>
    </main>
  );
};

export default Login;
