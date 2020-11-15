import React, { useEffect, useMemo, useState } from "react";
import Axios from "axios";
import PlaceCard from "../molecules/placeCard";
import { Link } from "react-router-dom";
import { InputField } from "../atoms/InputField";

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

  const [searchValue, setSearchValue] = useState("");

  const filteredList = useMemo(() => {
    if (searchValue == "") {
      return list;
    }
    return list.filter((place) => {
      return (
        place.location.toLowerCase().includes(searchValue.toLowerCase()) ||
        place.type.toLowerCase().includes(searchValue.toLowerCase()) ||
        place.description.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  }, [searchValue, list]);

  return (
    <div className="placeList">
      <div>{error}</div>
      <div className="placeList-searchBar">
        {/* <p> Vous recherchez une annonce ?</p> */}
        <InputField
          name="searching"
          value={searchValue}
          type="search"
          placeholder=" Rechercher une annonce..."
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
      <div className="placeList-cards">
        {filteredList.map((place) => {
          return (
            <Link className="placeCard-link" to={`/hebergements/${place.id}`}>
              <PlaceCard place={place} key={place.id} />
            </Link>
          );
        })}

        {/* {list.map((place) => {
          return (
            <Link className="placeCard-link" to={`/hebergements/${place.id}`}>
              <PlaceCard place={place} key={place.id} />
            </Link>
          );
        })} */}
      </div>
    </div>
  );
}
