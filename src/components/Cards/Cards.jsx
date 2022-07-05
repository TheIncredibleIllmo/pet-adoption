import React, { useContext } from "react";
import Card from "./Card/Card";
import "../Cards/Cards.css";
import { PetsContext } from "../Pets/Pets";
const Cards = () => {
  const { pets } = useContext(PetsContext);

  return (
    <div className="pet-cards-container">
      {pets?.map((pet, index) => (
        <Card
          key={pet.id}
          name={pet.name}
          phone={pet.phone}
          email={pet.email}
          image={pet.image}
          isFavorite={pet.favoured}
          index={index}
        />
      )) ?? []}
    </div>
  );
};

export default Cards;
