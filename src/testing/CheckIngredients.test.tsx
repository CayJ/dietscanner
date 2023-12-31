import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import CheckIngredients from "../components/CheckIngredients/CheckIngredients";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";

describe("CheckIngredients page", () => {
  it("renders the subtitle with the selected diet", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CheckIngredients diets={["Vegetarian"]} />
        </MemoryRouter>
      </Provider>,
    );
    expect(
      screen.getByText("Flagged Ingredients for: Vegetarian"),
    ).toBeInTheDocument();
  });

  it("renders the ingredients list", () => {
    const mockStore = configureStore({
      reducer: rootReducer,
      preloadedState: {
        diet: {
          ingredients: ["Chicken"],
          view: "CHECK_INGREDIENTS",
        },
      },
    });

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CheckIngredients diets={["Vegetarian"]} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Chicken")).toBeInTheDocument();
  });
});
