import { useEffect, useState } from "react";
import styles from "./app.module.scss";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { TokenSection } from "./components/TokenSection/TokenSection";

export interface IToken {
  id: string;
  amount: number;
}

export let selectedTokens: IToken[] = [];

function App() {
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("selectedTokens")) {
      selectedTokens = JSON.parse(
        localStorage.getItem("selectedTokens") as string
      );
    }
    setReload(true);
  }, []);

  return (
    <div className={styles.app}>
      <SearchBar selectedTokens={selectedTokens} setReload={setReload} />
      <h1>Dashboard</h1>
      <TokenSection
        selectedTokens={selectedTokens}
        reload={reload}
        setReload={setReload}
      />
    </div>
  );
}

export default App;
