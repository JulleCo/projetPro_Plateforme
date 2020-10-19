import Axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { ButtonAction } from "../atoms/ButtonAction";

export function Inscription() {
  const history = useHistory();
  const alert = useAlert();

  const [signup, setSignup] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    accessCode: null,
    isSubmitting: false,
    errorMessage: null,
  });

  const handleChange = (event) => {
    setSignup({ ...signup, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSignup({
        ...signup,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:1234/signup",
        data: JSON.stringify(signup),
      });
      if (result.status === 201) {
        return (
          alert.show("Inscription validée!"), 
          history.push("./connexion")
        );
      }
    } catch (error) {
      setSignup({
        ...signup,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
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
        />
      </div>
      <div>{signup.errorMessage}</div>
      <ButtonAction className="signupForm_button" type="submit" name="Valider" />
    </form>
  );
}
