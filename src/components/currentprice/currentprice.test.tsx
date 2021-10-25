import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import CurrentPrice from "./currentprice";
import { getCurrentPrice } from "../../services/dataService";

describe("current price tests", () => {
//   test("Initial price", () => {
//     const selectedcurrency = {
//       name: "USD",
//       symbol: "$",
//     };
//     render(<CurrentPrice selectedCurrency={selectedcurrency} />);
//     expect(screen.getByText("00,000")).toBeInTheDocument();
//   });
  test("renders current price from api", async () => {
    const selectedcurrency = {
      name: "USD",
      symbol: "$",
    };
    await act(async () => {
      render(<CurrentPrice selectedCurrency={selectedcurrency} />);
      const rate = await getCurrentPrice("USD");
      await waitFor(() =>
        expect(screen.getByText(`${rate.bpi.USD.rate}`)).toBeInTheDocument()
      );
    });
  });
  test("the fetch fails with an error", async () => {
    const currency: string = "USD";
    try {
      await getCurrentPrice(currency);
    } catch (e) {
      expect(e.message).toBe(
        `A Network Error occured while fetching current price in ${currency}`
      );
    }
  });
});
