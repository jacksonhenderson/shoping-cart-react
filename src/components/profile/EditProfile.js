import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//func get cookie
import { getCookie } from "../../functions/getCookie";
//Api
import { updateData } from "../../services/updateData";
//component
import Loder from "../shared/Loder";
//Styles
import Styles from "./EditProfile.module.css";
import { Button, IconButton, TextField } from "@mui/material";
import { AttachFile, Label } from "@mui/icons-material";

const EditProfile = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.userDataState.data);
  const { id, title } = state;
  // Preview img
  const [src, setSrc] = useState();
  const [status, setStatus] = useState();
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    name: "",
    profile: "",
  });
  //Cheked login
  useEffect(() => {
    if (!getCookie("token")) {
      navigate("/login");
    }
  }, []);
  //Get page Profile
  useEffect(() => {
    if (status) {
      if (status.success) {
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    }
  }, [status]);
  //Change Data
  const changeHandler = (e) => {
    if (e.target.name === "name")
      setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === "profile") {
      setData({ ...data, [e.target.name]: e.target.files[0] });
      setSrc(URL.createObjectURL(e.target.files[0]));
    }
  };
  //Submit Change data
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!data.name && !data.profile) {
      setError("Please apply your changes");
    } else {
      setError(false);
      setStatus("loading");
      setStatus(
        await updateData(title, data.name, data.profile, id, getCookie("token"))
      );
    }
  };

  return (
    <main className={Styles.container}>
      <div>
        <div className={Styles.image}>{src && <img src={src} />}</div>
        <form>
          <TextField
            name="name"
            value={data.name}
            onChange={(e) => changeHandler(e)}
            id="standard-basic"
            label="Change Name"
            variant="standard"
          />

          <IconButton
            color="primary"
            component="label"
            sx={{ borderRadius: "5px" }}
          >
            <label>Edit Profile</label>
            <input
              type="file"
              accept="image/*"
              name="profile"
              onChange={(e) => changeHandler(e)}
              hidden
            />
            <AttachFile fontSize="medium" />
          </IconButton>

          {
            // Check for errors and displays
            error && (
              <div className={Styles.messege}>
                <p>{error}</p>
              </div>
            )
          }
          {status && (
            // Show server response
            <>
              {status.success && (
                <div className={Styles.succefull}>
                  <p>Your profile changed successfully</p>
                </div>
              )}

              {!status.success && (
                <div className={Styles.messege}>
                  <p>{status.error}</p>
                </div>
              )}
            </>
          )}
          <div className={Styles.buttonContainer}>
            <Button variant="contained" onClick={(e) => submitHandler(e)}>
              Submit
            </Button>
            <Button onClick={() => navigate("/profile")} variant="contained">
              Back
            </Button>
          </div>

          {status === "loading" && (
            <div className={Styles.loder}>
              <Loder />
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
