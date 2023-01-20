import { useState } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar/SearchBar";

function App() {
  return (
    <div className="App">
      <div>
        <SearchBar />
      </div>
      <h1>Dashboard</h1>
      <div className="card"></div>
    </div>
  );
}

export default App;
