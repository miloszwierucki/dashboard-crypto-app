import { useEffect, useState } from "react";
import styles from "./app.module.scss";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { TokenSection } from "./components/TokenSection/TokenSection";

export interface IToken {
  id: string;
  name: string;
  amount: number;
}

export const selectedTokens: IToken[] = [];

function App() {
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("selectedTokens")) {
      selectedTokens.push(
        ...JSON.parse(localStorage.getItem("selectedTokens") as string)
      );
    }
  }, []);

  return (
    <div className={styles.app}>
      <div>
        <SearchBar selectedTokens={selectedTokens} setReload={setReload} />
      </div>
      <h1>Dashboard</h1>
      <TokenSection selectedTokens={selectedTokens} reload={reload} />
    </div>
  );
}

export default App;
