import Axios from "axios";
import React, { useEffect, useState } from "react";
import { PlaceForm } from "./PlaceForm";

export function PlaceFormUD({name}) {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("user");
  const [list, setList] = useState([]);
  const [error, setError] = useState(" ");

  useEffect(() => {
    const axiosData = async () => {
      try {
        const databaseState = await Axios({
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          url: `http://localhost:1234/places/userid=${id}`,
        });
        if (databaseState.data) {
          setList(databaseState.data); 
        }
      } catch (error) {
        setError(error.response.data.error);
      }
    };
    axiosData();
  }, [id, token]);

  return (
    <div className="placeListByUser">
      <div>{error}</div>
      <div className="placeListByUser-cards">
        {list.map((dataPlace) => {
          return (
            <PlaceForm 
            name={name}
            dataPlace={dataPlace}
            key={dataPlace.id}/>
          );
        })}
      </div>
    </div>
  );
}
