import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { ButtonAction } from "../atoms/ButtonAction";
import { InputField } from "../atoms/InputField";

export function UserProfil(props) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const alert = useAlert();

  let [infoUser, setInfoUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const axiosData = async () => {
      try {
        const result = await Axios({
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          url: `http://localhost:1234/user/${user}`,
        });
        if (result.data) {
          setInfoUser({
            ...infoUser,
            firstName: result.data.userFound.firstName,
            lastName: result.data.userFound.lastName,
            password: result.data.userFound.password,
            email: result.data.userFound.email,
          });
        }
      } catch (error) {
        setError(error.response.data.description);
      }
    };
    axiosData();
  }, [token, user]);

  //   const handleChange = (event) => {
  //     setInfoUser({
  //       ...infoUser,
  //       [event.target.name]: event.target.value,
  //     });
  //   };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setInfoUser({
      ...infoUser,
      [name]: value,
    });
  };

  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setInfoUser({
        ...infoUser,
        errorMessage: null,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:1234/user/${user}`,
        data: JSON.stringify(infoUser),
      });
      if (result.status === 201) {
        return alert.show("Informations modifiées !");
      }
    } catch (error) {
      setInfoUser({
        ...infoUser,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };

  if (error !== "") {
    return (
      <>
        <p>Erreur de chargement </p>
        <p> Désolé… {error}</p>
      </>
    );
  }
  return (
    <>
      <h2>{infoUser.firstName} : tes infos perso</h2>

      <form
        className="userForm"
        method="PATCH"
        action="/user"
        onSubmit={handleSubmit}
      >
        <InputField
          type="text"
          name="firstName"
          id="firstName"
          value={infoUser.firstName}
          onChange={handleChange}
        ></InputField>

        <InputField
          type="text"
          name="lastName"
          id="lastName"
          value={infoUser.lastName}
          onChange={handleChange}
        ></InputField>

        <InputField
          type="email"
          name="email"
          id="email"
          value={infoUser.email}
          onChange={handleChange}
        />

        {/* <InputField
          type="text"
          name="password"
          id="password"
          value={infoUser.password}
          onChange={handleChange}
        /> */}

        <p>{infoUser.errorMessage}</p>
        <ButtonAction
          className="userForm_button-Modif"
          type="submit"
          name="Sauvegarder les modifications"
        />
      </form>
    </>
  );
}
