import React, { useState, useEffect } from "react";
//Css Import
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

//Components import
import Graph from "./components/graph/graph";
import CurrentPrice from "./components/currentprice/currentprice";
//Bootstrap import
import Alert from "react-bootstrap/Alert";
//Models import
import { SelectedCurrency } from "./models/selectedcurrency";

const App: React.FC = () => {
  const [error, seterror] = useState<string | null>(null); //For saving state of api errors
  const [selectedcurrency, setselectedcurrency] = useState<SelectedCurrency>({
    name: "USD",
    symbol: "$",
  });

  useEffect(() => {}, []);

  return (
    <div className="app">
      <div className="app__errors h-50">
        {error !== null && (
          <Alert variant="danger" onClose={() => seterror(null)} dismissible>
            <Alert.Heading>{error}</Alert.Heading>
          </Alert>
        )}
        <CurrentPrice
          onCurrencyChange={(currency: SelectedCurrency) =>
            setselectedcurrency(currency)
          }
          onError={(msg: string) => seterror(msg)}
          selectedCurrency={selectedcurrency}
        />
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
