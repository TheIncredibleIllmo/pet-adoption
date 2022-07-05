import { render, screen } from "@testing-library/react";
import Cards from "./Cards";
import cats from "../testMocks/cats.json";
import { PetsContext } from "../Pets/Pets";

describe("Cards", () => {
  // this test does not include shadow rendering
  const renderComponent = () => {
    render(
      <PetsContext.Provider value={{ pets: cats, setCats: jest.fn() }}>
        <Cards />
      </PetsContext.Provider>
    );
  };

  test("should render 5 pets", () => {
    renderComponent();
    expect(screen.getAllByRole("article").length).toBe(5);
  });
});
