import { render, screen, within } from "@testing-library/react";
import Pets from "./Pets";
import { rest } from "msw";
import { setupServer } from "msw/node";
import catsMock from "../testMocks/cats.json";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.get("http://localhost:4000/cats", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catsMock));
  })
);
describe("Pets", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const renderComponent = () => {
    render(<Pets />);
  };

  test("should render correct amount of cards", async () => {
    renderComponent();

    const cards = await screen.findAllByRole("article");

    expect(cards.length).toBe(5);
  });

  test("should filter for male cats", async () => {
    renderComponent();

    const cards = await screen.findAllByRole("article");

    expect(cards.length).toBe(5);

    userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");

    const maleCards = screen.getAllByRole("article");

    expect(maleCards.length).toBe(2);
    expect(maleCards).toStrictEqual([cards[1], cards[3]]);
  });

  test("should filter for female cats", async () => {
    renderComponent();

    const cards = await screen.findAllByRole("article");

    expect(cards.length).toBe(5);

    userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");

    const maleCards = screen.getAllByRole("article");

    expect(maleCards.length).toBe(3);
    expect(maleCards).toStrictEqual([cards[0], cards[2], cards[4]]);
  });

  const createTest = (cards, favouriteOption) => {
    expect(cards.length).toBe(5);

    const btnForFirstCard = within(cards[0]).getByRole("button");
    const btnForFourthCard = within(cards[3]).getByRole("button");

    userEvent.click(btnForFirstCard);
    userEvent.click(btnForFourthCard);

    userEvent.selectOptions(
      screen.getByLabelText(/favourite/i),
      favouriteOption
    );

    const favouriteCards = screen.getAllByRole("article");

    const isFavourite = favouriteOption === "favourite";

    expect(favouriteCards.length).toBe(isFavourite ? 2 : 3);
    expect(favouriteCards).toStrictEqual(
      isFavourite ? [cards[0], cards[3]] : [cards[1], cards[2], cards[4]]
    );
  };

  test("should filter for favoured cats", async () => {
    renderComponent();

    const cards = await screen.findAllByRole("article");

    expect(cards.length).toBe(5);

    /**
     * Searches inside each card, that way you can avoid
     * pulling up other buttons
     */
    const btnForFirstCard = within(cards[0]).getByRole("button");
    const btnForFourthCard = within(cards[3]).getByRole("button");

    userEvent.click(btnForFirstCard);
    userEvent.click(btnForFourthCard);

    userEvent.selectOptions(screen.getByLabelText(/favourite/i), "favourite");

    const favouriteCards = screen.getAllByRole("article");
    expect(favouriteCards.length).toBe(2);
    expect(favouriteCards).toStrictEqual([cards[0], cards[3]]);
  });

  test("should filter for favoured male cats", async () => {
    renderComponent();

    const cards = await screen.findAllByRole("article");

    createTest(cards, "favourite");

    userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");

    const maleFavouriteCards = screen.getAllByRole("article");
    expect(maleFavouriteCards.length).toBe(1);
    expect(maleFavouriteCards).toStrictEqual([cards[3]]);
  });

  test("should filter for favoured female cats", async () => {
    renderComponent();

    const cards = await screen.findAllByRole("article");

    createTest(cards, "favourite");

    userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");

    const maleFavouriteCards = screen.getAllByRole("article");
    expect(maleFavouriteCards.length).toBe(1);
    expect(maleFavouriteCards).toStrictEqual([cards[0]]);
  });

  test("should filter for not favoured male cats", async () => {
    renderComponent();

    const cards = await screen.findAllByRole("article");

    createTest(cards, "not favourite");

    userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");

    const maleNotFavouriteCards = screen.getAllByRole("article");
    expect(maleNotFavouriteCards.length).toBe(1);
    expect(maleNotFavouriteCards).toStrictEqual([cards[1]]);
  });

  test("should filter for not favoured female cats", async () => {
    renderComponent();

    const cards = await screen.findAllByRole("article");

    createTest(cards, "not favourite");

    userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");

    const maleNotFavouriteCards = screen.getAllByRole("article");
    expect(maleNotFavouriteCards.length).toBe(2);
    expect(maleNotFavouriteCards).toStrictEqual([cards[2], cards[4]]);
  });
});
