import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IMyToken, getInfoToken } from "../TokenSection/updatePrice";
import { TokenElement } from "../TokenElement/TokenElement";
import { WhitelistTokenElement } from "../WhitelistTokenElement/WhitelistTokenElement";
import { IToken } from "../../App";

export const TokenSection: FC<{
  selectedTokens: IToken[];
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ selectedTokens, reload, setReload }) => {
  const [myToken, setMyToken] = useState([] as IMyToken[]);
  const [sum, setSum] = useState(
    localStorage.getItem("sum") ? JSON.parse(localStorage.getItem("sum")!) : 0
  ) as [number, React.Dispatch<number>];

  useEffect(() => {
    const interval = setInterval(() => {
      setReload(true);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (reload) {
    getInfoToken(selectedTokens).then((array) => setMyToken([...array]));
    setReload(false);
  }

  return (
    <div className={styles.tokenSection}>
      <section className={styles.sectionList}>
        <h2>My Tokens</h2>
        <h3>Sum: {sum.toFixed(2)}$</h3>
        <ul>
          {myToken
            .filter((element) => element.owned === true)
            .map(({ id, name, image, symbol, price, priceChange }) => {
              return (
                <TokenElement
                  key={id}
                  id={id}
                  name={name}
                  image={image}
                  amount={
                    selectedTokens.find((element) => element.id === id)?.amount
                  }
                  symbol={symbol}
                  price={price}
                  priceChange={priceChange}
                  selectedTokens={selectedTokens}
                  myTokens={myToken}
                  setMyTokens={setMyToken}
                  setSum={setSum}
                />
              );
            })}
        </ul>
      </section>
      <section className={styles.sectionWhitelist}>
        <h2>Other Tokens</h2>
        <h3>Whitelist:</h3>
        <ul>
          {myToken
            .filter((element) => element.owned === false)
            .map(({ id, name, image, symbol, price, priceChange }) => {
              return (
                <WhitelistTokenElement
                  key={id}
                  id={id}
                  name={name}
                  image={image}
                  amount={
                    selectedTokens.find((element) => element.id === id)?.amount
                  }
                  symbol={symbol}
                  price={price}
                  priceChange={priceChange}
                  selectedTokens={selectedTokens}
                  myTokens={myToken}
                  setMyTokens={setMyToken}
                />
              );
            })}
        </ul>
      </section>
    </div>
  );
};
