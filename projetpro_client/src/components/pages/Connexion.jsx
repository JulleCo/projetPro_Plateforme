import Axios from "axios";
import React, { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
import { ButtonAction } from "../atoms/ButtonAction";

export function Connexion(props) {
  const { dispatch } = useContext(AuthContext);

  const history = useHistory();

  const [signin, setSignin] = useState({
    email: null,
    password: null,
    isSubmitting: false,
    errorMessage: null,
  });

  const [errorForm, setErrorForm] = useState(" ");
  const alert = useAlert();

  const handleChange = (event) => {
    setSignin({ ...signin, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSignin({
        ...signin,
        email: "",
        password: "",
        isSubmitting: true,
      });
      alert.show("Bienvenue !");

      const result = await Axios.post("http://localhost:1234/signin", signin);
      if (result.status === 200) {
        return (
          dispatch({ type: "SIGNIN", payload: result }), history.push("./")
        );
      }
    } catch (error) {
      setSignin({
        ...signin,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };

  return (
    <form
      className="signinForm"
      method="POST"
      action="/signin"
      onSubmit={handleSubmit}
    >
      <div className="signinForm_email">
        <p>Email:</p>
        <input
          type="text"
          name="email"
          id="emailSignin"
          value={signin.email}
          onChange={handleChange}
        />
      </div>
      <div className="signinForm_password">
        <p>Password with 6 characters minimum, 1 capitale, 1 chiffre:</p>
        <input
          type="password"
          name="password"
          id="passSignin"
          value={signin.password}
          onChange={handleChange}
        />
      </div>
      <div>{errorForm}</div>
      <ButtonAction className="signinForm_button" />
    </form>
  );
}
