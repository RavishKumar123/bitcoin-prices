import React, { useState } from "react";
//Css Imports
import "./App.css";
//Components imports
import Graph from "./components/graph/graph";

interface SelectedCurrency {
  name: string;
  symbol: string;
}
const App: React.FC = () => {
  const [selectedcurrency, setselectedcurrency] = useState<SelectedCurrency>({
    name: "USD",
    symbol: "$",
  });
  return (
    <div className="App">
      <h1>Hello, bitcoin price app</h1>
      <Graph
        currency={selectedcurrency.name}
        onError={(msg: string) => console.log(msg)}
      />
    </div>
  );
};

export default App;
