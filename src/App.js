import React from "react";
import NavBar from "./components/NavBar/NavBar";
import CryptoTableInfo from "./components/CryptoTableInfo/CryptoTableInfo";
import CryptoTable from "./components/CryptoTable/CryptoTable";

function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        <CryptoTableInfo />
      </div>
    </>
  );
}

export default App;
