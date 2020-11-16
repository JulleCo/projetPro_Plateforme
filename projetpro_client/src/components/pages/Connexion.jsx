import Axios from "axios";
import React, { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
import { ButtonAction } from "../atoms/ButtonAction";

export function Connexion(props) {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const alert = useAlert();

  const [signin, setSignin] = useState({
    email: null,
    password: null,
    isSubmitting: false,
    errorMessage: null,
  });

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

      const result = await Axios({
        method: "post",
        headers: {"Content-Type": "application/json"},
        url: "http://localhost:1234/signin",
        data: JSON.stringify(signin),
      });
      if (result.status === 200) {
        return (
          dispatch({ type: "SIGNIN", payload: result }),
          history.push("./"),
          alert.show("Bienvenue !")
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
      className="signupForm"
      method="POST"
      action="/signin"
      onSubmit={handleSubmit}
    >
      <div className="signupForm_email">
        <p>Email:</p>
        <input
          type="text"
          name="email"
          id="emailSignin"
          value={signin.email}
          onChange={handleChange}
        />
      </div>
      <div className="signupForm_password">
        <p>Password with 6 characters minimum, 1 capitale, 1 chiffre:</p>
        <input
          type="password"
          name="password"
          id="passSignin"
          value={signin.password}
          onChange={handleChange}
        />
      </div>
      <div>{signin.errorMessage}</div>
      <ButtonAction className="signinForm_button" type="submit" name="Valider"/>
    </form>
  );
}
