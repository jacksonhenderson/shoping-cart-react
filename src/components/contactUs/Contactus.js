import React, { useState, useEffect, useRef } from "react";
//Services
import sendComment from "../../services/sendComment";
// function
import { Validate } from "../../functions/validate";
//Components
import Loder from "../shared/Loder";
//Icons
import { ImLocation2 } from "react-icons/im";
import { BsTelephoneFill } from "react-icons/bs";
import { FaFax } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
//Styles
import Styles from "./Contactus.module.css";
//mui
import { FormControl, Input, InputLabel, TextField, Grid } from "@mui/material";
const Contactus = () => {
  const form = useRef();
  //Show message comment
  const [status, setStatus] = useState(false);
  //Focus Inputs
  const [focuss, setFocuss] = useState({
    email: false,
    name: false,
    message: false,
  });
  // Error Validate
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    message: "",
  });
  // Data Comment
  const [data, setData] = useState({
    email: "",
    name: "",
    message: "",
  });
  //Validate Comments
  useEffect(() => {
    setErrors(Validate(data, "comment"));
  }, [data]);
  //Submit Form Comments
  const sendMessage = async (e) => {
    e.preventDefault();
    //Cheked Errors
    if (!Object.keys(errors).length) {
      setStatus("loading");
      setStatus(await sendComment(form));
      if (status) {
        setTimeout(() => {
          setStatus(false);
        }, 5000);
      }
    } else {
      setFocuss({
        name: true,
        email: true,
        message: true,
      });
    }
  };

  return (
    <main className={Styles.container}>
      {
        // Show notification
        status && (
          <div
            className={
              Styles.notifi +
              " " +
              (status.status && Styles.messageSuccess) +
              " " +
              (status.error && Styles.messageFailed)
            }
          >
            <span>
              {status.status
                ? "Your message was successfully sent to the webmaster"
                : status.error}
            </span>
          </div>
        )
      }

      <section className={Styles.contact}>
        <article>
          <ImLocation2 />
          <div>
            <h4>Loaction</h4>
            <p>Karag,mahdasht</p>
          </div>
        </article>
        <article>
          <BsTelephoneFill />
          <div>
            <h4>Tel</h4>
            <p>015-2536-456</p>
          </div>
        </article>
        <article>
          <FaFax />
          <div>
            <h4>Fax</h4>
            <p>0036954-8</p>
          </div>
        </article>
        <article>
          <AiTwotoneMail />
          <div>
            <h4>Email</h4>
            <p>EhsanKeyhani.ir@gmail. com</p>
          </div>
        </article>
      </section>
      <section className={Styles.sendEmail}>
        <form ref={form} onSubmit={(e) => sendMessage(e)}>
          <h2>Contact Us</h2>
          <FormControl
            sx={{ width: { xs: "250px", sm: "60%" }, marginTop: "17px" }}
          >
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={data.name}
              error={errors.name && focuss.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              onFocus={() => setFocuss({ ...focuss, name: true })}
              aria-describedby="my-helper-text"
            />
          </FormControl>

          <FormControl
            sx={{ width: { xs: "250px", sm: "60%" }, marginTop: "17px" }}
          >
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              value={data.email}
              error={errors.email && focuss.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              onFocus={() => setFocuss({ ...focuss, email: true })}
              aria-describedby="my-helper-text"
            />
          </FormControl>

          <FormControl
            sx={{ width: { xs: "250px", sm: "60%" }, marginTop: "17px" }}
          >
            <TextField
              id="message"
              label="Multiline"
              multiline
              rows={4}
              value={data.message}
              error={errors.message && focuss.message}
              onChange={(e) => setData({ ...data, message: e.target.value })}
              onFocus={() => setFocuss({ ...focuss, message: true })}
            />
          </FormControl>

          <div className={Styles.sendComment}>
            <input type="submit" />
            <div className={Styles.loder}>
              {status === "loading" && <Loder />}
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Contactus;
