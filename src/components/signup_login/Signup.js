import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//Coponents
import Loder from "../shared/Loder";
// functions
import { Validate } from "../../functions/validate";
import { getCookie } from "../../functions/getCookie";
// auth
import authentication from "../../services/authentication";
// Services
import newBolg from '../../services/newBlog';
//Styles
import Styles from "./Signup.module.css";
//mui
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Input,
  Grid,
  IconButton,
} from "@mui/material";
//Icon
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const [status, setStatus] = useState();
  const [focuss, setFocuss] = useState({
    name: false,
    email: false,
    password: false,
    confrimPassword: false,
    isAccepted: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confrimPassword: "",
    isAccepted: false,
  });
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confrimPassword: "",
    isAccepted: false,
  });
  //Validate Data
  useEffect(() => {
    setErrors(Validate(data, "signup"));
  }, [data]);
  // send Data
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      setStatus("loading");
      setStatus(
        await authentication(
          {
            name: data.name,
            email: data.email,
            password: data.password,
          },
          "signup"
        )
      );
      if (getCookie("token")) {
        if (await newBolg(getCookie("token"), data.name)) {
          navigate("/profile");
        } else {
          setTimeout(() => {
            newBolg(getCookie("token"), data.name);
          }, 50000);
        }
      }
    } else {
      setFocuss({
        name: true,
        email: true,
        password: true,
        confrimPassword: true,
        isAccepted: true,
      });
    }
  };

  return (
    <main className={Styles.container}>
      <form onSubmit={submitHandler} className={Styles.formContainer}>
        <h2 className={Styles.header}>SignUp</h2>
        <Grid
          container
          spacing={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={100}
        >
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: "230px" }}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                value={data.name}
                error={errors.name && focuss.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                onFocus={() => setFocuss({ ...focuss, name: true })}
                aria-describedby="my-h"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: "230px" }}>
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
                  <IconButton onClick={() => setShowPassword((prve) => !prve)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: "230px" }}>
              <InputLabel htmlFor="confrimPassword">
                Confrim Password
              </InputLabel>
              <Input
                id="confrimPassword"
                value={data.confrimPassword}
                error={errors.confrimPassword && focuss.confrimPassword}
                onChange={(e) =>
                  setData({ ...data, confrimPassword: e.target.value })
                }
                onFocus={() => setFocuss({ ...focuss, confrimPassword: true })}
                type={showConPassword ? "text" : "password"}
                endAdornment={
                  <IconButton
                    onClick={() => setShowConPassword((prve) => !prve)}
                  >
                    {showConPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
            </FormControl>
          </Grid>
        </Grid>

        <FormControlLabel
          label={
            <InputLabel sx={{ fontSize: "14px" }}>
              I accet terms of privacy policy
            </InputLabel>
          }
          control={
            <Checkbox
              color="success"
              checked={data.isAccepted}
              error={errors.isAccepted && focuss.isAccepted}
              onChange={(e) =>
                setData({ ...data, isAccepted: !data.isAccepted })
              }
              onFocus={() => setFocuss({ ...focuss, isAccepted: true })}
            />
          }
        />

        {errors.isAccepted && focuss.isAccepted && (
          <span className={Styles.message}>{errors.isAccepted}</span>
        )}

        <div className={Styles.formButtons}>
          <Link to="/login">Login</Link>
          {status === "loading" && <Loder />}
          <button type="submit">Sign Up</button>
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

export default SignUp;
