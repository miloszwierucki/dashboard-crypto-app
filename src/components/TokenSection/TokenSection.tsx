import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IMyToken, getInfoToken } from "../TokenSection/updatePrice";
import { IToken } from "../../App";

const TokenElement: FC<IMyToken> = ({
  id,
  name,
  image,
  amount,
  symbol,
  price,
  priceChange,
  selectedTokens,
}) => {
  const [input, setInput] = useState(amount?.toString());

  return (
    <li className={styles.element}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{symbol.toUpperCase()}</p>
      <input
        type="text"
        value={input}
        onInput={(e) => {
          (e.target as HTMLTextAreaElement).value = (
            e.target as HTMLTextAreaElement
          ).value
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*?)\..*/g, "$1")
            .replace(/^0[^.]/, "0");
        }}
        placeholder="..."
        onChange={(e) => {
          setInput(e.target.value);
          if (selectedTokens) {
            selectedTokens.find((element) => element.id === id)!.amount =
              Number(e.target.value);
            localStorage.setItem(
              "selectedTokens",
              JSON.stringify(selectedTokens)
            );
          }
        }}
      />
      <p>{`${(Number(input) * price).toFixed(2)}$`}</p>
      <p>{`${price}$`}</p>
      <p className={priceChange > 0 ? styles.green : styles.red}>{`${
        priceChange !== null ? priceChange.toFixed(2) : "-"
      }%`}</p>
    </li>
  );
};

export const TokenSection: FC<{
  selectedTokens: IToken[];
  reload: boolean;
}> = ({ selectedTokens, reload }) => {
  const [myToken, setMyToken] = useState([] as IMyToken[]);

  useEffect(() => {
    const interval = setInterval(() => {
      getInfoToken(selectedTokens).then((array) => setMyToken([...array]));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (reload) {
    getInfoToken(selectedTokens).then((array) => setMyToken([...array]));
  }

  return (
    <>
      <h2>My Tokens</h2>
      <button
        onClick={() =>
          getInfoToken(selectedTokens).then((array) => setMyToken([...array]))
        }
      ></button>
      <ul>
        {myToken.map(({ id, name, image, symbol, price, priceChange }) => {
          return (
            <TokenElement
              key={id}
              id={id}
              name={name}
              image={image}
              amount={
                selectedTokens.find((element) => element.id === id)!.amount
              }
              symbol={symbol}
              price={price}
              priceChange={priceChange}
              selectedTokens={selectedTokens}
            />
          );
        })}
      </ul>
    </>
  );
};
