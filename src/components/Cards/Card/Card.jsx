import React, { useContext, useState } from "react";
import { PetsContext } from "../../Pets/Pets";
import heartFilled from "../../svgs/heartFilled.svg";
import heartOutlined from "../../svgs/heartOutlined.svg";
import "./Card.css";

const Card = ({ name, phone, email, image, isFavorite, index }) => {
  const { pets, setPets } = useContext(PetsContext);

  const [favoritePet, setFavoritePet] = useState(isFavorite);

  const updateFavourite = (index, favoured) => {
    //TODO: Fix error when filtering then mark it as favorite
    // then unmark it and reset filters to any and any
    // the array will be [] for pets and filteredPets.
    const updatedPets = [...pets];
    updatedPets[index].favoured = favoured;
    setPets(updatedPets);
  };

  const toggleFavorite = () => {
    setFavoritePet((prev) => !prev);
    updateFavourite(index, !isFavorite);
  };

  return (
    /*
     * article:
     * provides semantic html to the user, which is more meaningful than a div
     * query for is easier
     */
    <article className="card">
      <div className="card-header">
        <img src={image.url} alt={image.alt} className="card-img" />
        <button className="heart" onClick={toggleFavorite}>
          {favoritePet ? (
            <img src={heartFilled} alt="filled-heart" />
          ) : (
            <img src={heartOutlined} alt="outlined-heart" />
          )}
        </button>
      </div>

      <div className="card-content">
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  );
};

export default Card;
