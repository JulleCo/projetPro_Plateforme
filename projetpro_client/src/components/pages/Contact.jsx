import Axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { ButtonAction } from "../atoms/ButtonAction";

export function Contact({ closeModale = () => {} }) {
  const alert = useAlert();

  const [mailSender, setMailSender] = useState({
    email: null,
    messageSubject: null,
    text: null,
    isSubmitting: false,
    errorMessage: null,
  });

  const handleChange = (event) => {
    setMailSender({ ...mailSender, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setMailSender({
        ...mailSender,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:1234/contact",
        data: JSON.stringify(mailSender),
      });
      if (result.status === 201) {
        return (
          closeModale(),
          alert.show("Message envoyé!"),
          setMailSender({
            ...mailSender,
            email: "",
            messageSubject: "",
            text: "",
            errorMessage: null,
          })
        );
      }
    } catch (error) {
      setMailSender({
        ...mailSender,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };
  
  return (
    <>
      <form
        className="mailSender"
        method="POST"
        action="/contact"
        onSubmit={handleSubmit}
      >
        <div className="mailSender_subject">
          <p>Email:</p>
          <input
            type="text"
            name="email"
            id="email"
            value={mailSender.email}
            onChange={handleChange}
          />
          <p>Subject:</p>
          <input
            type="text"
            name="messageSubject"
            id="messageSubject"
            value={mailSender.messageSubject}
            onChange={handleChange}
          />
        </div>
        <div className="mailSender_content">
          <p>Message:</p>
          <input
            type="text"
            name="text"
            id="text"
            value={mailSender.text}
            onChange={handleChange}
          />
        </div>
        <div>{mailSender.errorMessage}</div>
        <ButtonAction
          className="mailSender_button"
          type="submit"
          name="Envoyer"
          onClick={handleSubmit}
        />
      </form>
    </>
  );
}
