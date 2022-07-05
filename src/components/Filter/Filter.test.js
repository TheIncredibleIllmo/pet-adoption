import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "./Filter";

const props = {
  filters: {
    gender: "any",
    favourite: "any",
  },
  setFilters: jest.fn(),
};

describe("Filter", () => {
  const renderComponent = () => render(<Filter {...props} />);
  /**
   * favorite is the USA spelling
   * favourite is the Canadian spelling
   */
  test("should be able to change value of favourite select", () => {
    renderComponent();
    const select = screen.getByLabelText(/favourite/i);
    expect(select.value).toBe("any");

    userEvent.selectOptions(select, "favourite");
    expect(select.value).toBe("favourite");

    userEvent.selectOptions(select, "Not Favourite");
    expect(select.value).toBe("not favourite");
  });

  test("should be able to change value of gender select", () => {
    renderComponent();
    const select = screen.getByLabelText(/gender/i);
    expect(select.value).toBe("any");

    userEvent.selectOptions(select, "male");
    expect(select.value).toBe("male");

    userEvent.selectOptions(select, "female");
    expect(select.value).toBe("female");
  });
});
