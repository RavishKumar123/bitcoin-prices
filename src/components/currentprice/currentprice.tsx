import React, { useState, useEffect } from "react";
// Services import
import { getCurrentPrice } from "../../services/dataService";

//Bootstrap import
import Dropdown from "react-bootstrap/Dropdown";

//Model import
import { SelectedCurrency } from "../../models/selectedcurrency";

interface Props {
  onError: Function;
  onCurrencyChange: Function;
  selectedCurrency: SelectedCurrency;
}
const CurrentPrice: React.FC<Props> = ({
  // object destructuring
  onError,
  onCurrencyChange,
  selectedCurrency,
}) => {
  const [currentprice, setcurrentprice] = useState<string>("00,000"); //state for current price
  const currencies: {
    [key: string]: string;
  } = { USD: "$", EUR: "€", CNY: "元", JPY: "¥", PLN: "zł" }; //All avail currency types
  const fetchCurrentPrice = (): void => {
    try {
      getCurrentPrice(selectedCurrency.name)
        .then((response) => {
          const price: string = response.bpi[selectedCurrency.name].rate;
          setcurrentprice(price);
        })
        .catch((err) => {
          onError(err.message);
        });
    } catch (e) {
      onError("An unknown error occured");
    }
  };
  useEffect(() => {
    fetchCurrentPrice();
  }, [selectedCurrency]);

  return (
    <div className="app__pricebox container">
      <div className="app__pricebox__inner">
        <div className="app__pricebox__row row">
          <div className="app__price-container col-md-7 d-flex justify-content-lg-end  justify-content-sm-center justify-content-center justify-content-md-end align-items-center ">
            <h1 className="text-right price__font-style">
              <span className="price__symbol">{selectedCurrency.symbol}</span>
              <span data-testid="priceSpan">{currentprice}</span>
            </h1>
          </div>
          <div className="app__currency-selector col-md-5 d-flex justify-content-lg-start  justify-content-sm-center justify-content-center justify-content-md-start align-items-center ">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedCurrency.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys(currencies).map((currency, index) => {
                  return (
                    <Dropdown.Item
                      onClick={(_) =>
                        onCurrencyChange({
                          name: currency,
                          symbol: currencies[currency],
                        })
                      }
                      key={index}
                    >
                      {currency}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPrice;
