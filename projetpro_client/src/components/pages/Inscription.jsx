import Axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { ButtonAction } from "../atoms/ButtonAction";

export function Inscription() {
  const [signup, setSignup] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    accessCode: null,
    // errorForm: null,
  });
  const [errorForm, setErrorForm] = useState(" ");
  const alert = useAlert();

  const handleChange = (event) => {
    setSignup({ ...signup, [event.target.name]: event.target.value });
  };
console.log("azert")
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:1234/signup", signup)
      .then((response) => {
        setSignup({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          accessCode: "",
        });
        alert.show("Inscription validée!");
      })
      .catch((error) => {
        setErrorForm(error.response.data.description);
      });
  };

  return (
    <form
      className="signupForm"
      method="POST"
      action="/signup"
      onSubmit={handleSubmit}
    >
      <div className="signupForm_firstName">
        <p>Prénom:</p>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={signup.firstName}
          onChange={handleChange}
          //   required
        />
      </div>
      <div className="signupForm_lastName">
        <p>Nom de famille:</p>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={signup.lastName}
          onChange={handleChange}
          //   required
        />
      </div>
      <div className="signupForm_email">
        <p>Email:</p>
        <input
          type="text"
          name="email"
          id="emailSignup"
          value={signup.email}
          onChange={handleChange}
          //   required
        />
      </div>
      <div className="signupForm_password">
        <p>Password with 6 characters minimum, 1 capitale, 1 chiffre:</p>
        <input
          type="password"
          name="password"
          id="passSignup"
          value={signup.password}
          onChange={handleChange}
          //   required
        />
      </div>
      <div className="signupForm_accessCode">
        <p>AccessCode:</p>
        <input
          type="text"
          name="accessCode"
          id="accessCode"
          value={signup.accessCode}
          onChange={handleChange}
          //   required
        />
      </div>
      <div>{errorForm}</div>
      <ButtonAction className="signupForm_button" />

    </form>
  );
}
