import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PetsContext } from "../../Pets/Pets";
import Card from "./Card";
import cats from "../../testMocks/cats.json";

describe("Card", () => {
  const cardProps = {
    name: "Sydney",
    phone: "1111-1111",
    email: "emedina@gmail.com",
    image: {
      url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      alt: "cute-cat",
    },
    isFavorite: false,
    index: 0,
  };

  const renderComponent = (props) =>
    render(
      <PetsContext.Provider value={{ pets: cats, setPets: jest.fn() }}>
        <Card {...cardProps} {...props} />
      </PetsContext.Provider>
    );
  test("should render with given props", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: /sydney/i })
    ).toBeInTheDocument();
    expect(screen.getByText(cardProps.phone)).toBeInTheDocument();
    expect(screen.getByText(cardProps.email)).toBeInTheDocument();
    //if you try it by role, you can get multiple elements, the cat and the svf
    // so you can get it thru the alt text.
    expect(screen.getByAltText(cardProps.image.alt).src).toBe(
      cardProps.image.url
    );

    expect(screen.getByAltText(/outlined-heart/i)).toBeInTheDocument();
  });

  test("should show outlined heart", () => {
    renderComponent({ isFavorite: true });
    expect(screen.queryByAltText(/outlined-heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled-heart/i)).toBeInTheDocument();
  });

  test("should toggle heart status", () => {
    renderComponent();

    userEvent.click(screen.getByRole("button"));

    expect(screen.queryByAltText(/outlined-heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled-heart/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole("button"));

    expect(screen.getByAltText(/outlined-heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled-heart/i)).not.toBeInTheDocument();
  });
});
