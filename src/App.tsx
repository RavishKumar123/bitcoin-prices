import React, { useState } from "react";
//Css Imports
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';

//Components imports
import Graph from "./components/graph/graph";
//Bootstrap imports
import Dropdown from "react-bootstrap/Dropdown";
import Alert from "react-bootstrap/Alert";
interface SelectedCurrency {
  name: string;
  symbol: string;
}
const App: React.FC = () => {
  const [error, seterror] = useState<string | null>(null); //For saving state of api errors
  const [currentprice, setcurrentprice] = useState<string>("00,000"); //state for current price
  const currencies: {
    [key: string]: string;
  } = { USD: "$", EUR: "€", CNY: "元", JPY: "¥", PLN: "zł" }; //All avail currency types 
  const [selectedcurrency, setselectedcurrency] = useState<SelectedCurrency>({
    name: "USD",
    symbol: "$",
  });
  return (
    <div className="app">
      <div className="app__errors h-50">
        {error !== null && (
          <Alert variant="danger" onClose={() => seterror(null)} dismissible>
            <Alert.Heading>{error}</Alert.Heading>
          </Alert>
        )}
        <div className="app__pricebox container">
          <div className="app__pricebox__inner">
            <div className="app__pricebox__row row">
              <div className="app__price-container col-md-7 d-flex justify-content-lg-end  justify-content-sm-center justify-content-center justify-content-md-end align-items-center ">
                <h1 className="text-right price__font-style">
                  <span className="price__symbol">
                    {selectedcurrency.symbol}
                  </span>
                  <span data-testid="priceSpan">{currentprice}</span>
                </h1>
              </div>
              <div className="app__currency-selector col-md-5 d-flex justify-content-lg-start  justify-content-sm-center justify-content-center justify-content-md-start align-items-center ">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedcurrency.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {Object.keys(currencies).map((currency, index) => {
                      return (
                        <Dropdown.Item
                          onClick={(_) =>
                            setselectedcurrency({
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
      </div>
      <div className="app__graph h-50">
        <Graph
          currency={selectedcurrency.name}
          onError={(msg: string) => seterror(msg)}
        />
      </div>
    </div>
  );
};

export default App;
