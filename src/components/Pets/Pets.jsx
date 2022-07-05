import React, { createContext, useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import Filter from "../Filter/Filter";
import "./Pets.css";
// import cats from "../testMocks/cats.json";
import axios from "axios";

export const PetsContext = createContext({
  pets: [],
  setPets: () => {},
});

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [filters, setFilters] = useState({
    gender: "any",
    favourite: "any",
  });

  const fetchCats = async () => {
    const response = await axios.get("http://localhost:4000/cats");
    const data = response?.data ?? [];
    setPets(data);
    setFilteredPets(data);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    let filtered = [...pets];

    if (filters.gender !== "any") {
      filtered = filtered.filter((x) => x.gender === filters.gender);
    }

    if (filters.favourite !== "any") {
      filtered = filtered.filter(
        (x) => x.favoured === (filters.favourite === "favourite")
      );
    }

    setFilteredPets(filtered);
  }, [pets, filters]);

  return (
    <div className="container">
      <div className="app-container">
        <PetsContext.Provider value={{ pets: filteredPets, setPets }}>
          <Filter filters={filters} setFilters={setFilters} />
          <Cards />
        </PetsContext.Provider>
      </div>
    </div>
  );
};

export default Pets;
