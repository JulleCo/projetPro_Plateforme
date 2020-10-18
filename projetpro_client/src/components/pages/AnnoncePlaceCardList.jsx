import React, { useEffect, useState } from "react";
import Axios from "axios";
import PlaceCard from "../molecules/placeCard";
import { Link } from "react-router-dom";

export function AnnoncePlaceCardList(props) {
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
          url: "http://localhost:1234/places",
        });
        if (result.data) {
          setList(result.data);
        }
      } catch (error) {
        setError(error.response.data.error);
      }
    };
    axiosData();
  }, [token]);

  return (
    <div className="placeList">
      <div>{error}</div>
      <p>SearchBar</p>
      <div className="placeList-cards">
        {list.map((place) => {
          return (
            <Link className="placeCard-link" to={`/hebergements/${place.id}`}>
              <PlaceCard place={place} key={place.id} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
