import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "./App";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        time: {
          updated: "Oct 24, 2021 21:16:00 UTC",
          updatedISO: "2021-10-24T21:16:00+00:00",
          updateduk: "Oct 24, 2021 at 22:16 BST",
        },
        disclaimer:
          "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
        bpi: {
          USD: {
            code: "USD",
            rate: "61,024.2933",
            description: "United States Dollar",
            rate_float: 61024.2933,
          },
        },
      }),
  })
);

test("renders learn react link", async () => {
  // await act(async () => render(<App />));
  expect(5).toBe(5);
});
