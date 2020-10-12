import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import PlaceCard from "../molecules/placeCard";
import { AuthContext } from "../../App";

export function AnnoncePlaceCardList(props) {
  const [list, setList] = useState([]);
  const [userId, setUserId] = useState("");
  const [errorForm, setErrorForm] = useState(" ");

  const { state } = useContext(AuthContext);
  useEffect(() => {
    return () => {};
  }, [state]);

  useEffect(() => {
    const axiosData = async () => {
      try {
        const result = await Axios.get(
          `http://localhost:1234/places?userId=${userId}`
        );
        if (result.data) {
          setList(result.data);
        }
      } catch (error) {
        setErrorForm(error.response.data.error);
      }
    };
    axiosData();
  }, [userId]);

  return (
    <div className="placeList">
      <div>{errorForm}</div>
      <p>SearchBar</p>
      <div className="placeList-cards">
        {list.map((place) => {
          return <PlaceCard place={place} key={place.id} />;
        })}
      </div>
    </div>
  );
}
