import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import PlaceCard from "../molecules/placeCard";
// import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";

export function AnnoncePlaceCardList(props) {
  // let history = useHistory();

  const [list, setList] = useState([]);
  const [error, setError] = useState(" ");

  const token = localStorage.getItem("token");
  useEffect(() => {
    const axiosData = async () => {
      try {
        const result = await Axios({
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          url: `http://localhost:1234/places`,
        });
        if (result.data) {
          setList(result.data);
        }
      } catch (error) {
        setError(error.response.data.error);
      }
    };
    axiosData();
  }, []);

  return (
    <div className="placeList">
      <div>{error}</div>
      <p>SearchBar</p>
      <div className="placeList-cards">
        {list.map((place) => {
          return <PlaceCard place={place} key={place.id} />;
        })}
      </div>
    </div>
  );
}
