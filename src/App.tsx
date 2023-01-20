import { useState } from "react";
import styles from "./app.module.scss";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { TokenSection } from "./components/TokenSection/TokenSection";

function App() {
  return (
    <div className={styles.app}>
      <div>
        <SearchBar />
      </div>
      <h1>Dashboard</h1>
      <TokenSection />
    </div>
  );
}

export default App;
