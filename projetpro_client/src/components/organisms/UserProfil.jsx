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
    accessCode: "",
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
            email: result.data.userFound.email,
            admin: result.data.userFound.admin,
            accessCode: result.data.userFound.accessCode,
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
      <form
        className="profilForm"
        method="PATCH"
        action="/user"
        onSubmit={handleSubmit}
      >
        <h2>Tes infos perso {infoUser.firstName}</h2>

        <p>Prénom :</p>
        <InputField
          type="text"
          name="firstName"
          id="firstName"
          value={infoUser.firstName}
          onChange={handleChange}
        ></InputField>

        <p>Nom :</p>
        <InputField
          type="text"
          name="lastName"
          id="lastName"
          value={infoUser.lastName}
          onChange={handleChange}
        ></InputField>

        <p>Email :</p>
        <InputField
          type="email"
          name="email"
          id="email"
          value={infoUser.email}
          onChange={handleChange}
        />

        {infoUser.admin ? (
          <div className="profilForm_accessCode">
            <p>
              accessCode à actualiser après chaque ajout de nouvel
              utilisateur-ice:
            </p>
            <InputField
              type="text"
              name="accessCode"
              id="accessCode"
              value={infoUser.accessCode}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div></div>
        )}

        <p>{infoUser.errorMessage}</p>
        <ButtonAction
          className="userForm_button-Modif"
          type="submit"
          name="Sauvegarder"
        />
      </form>
    </>
  );
}
