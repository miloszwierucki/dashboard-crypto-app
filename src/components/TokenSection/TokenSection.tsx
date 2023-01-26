import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IMyToken, getInfoToken } from "../TokenSection/updatePrice";
import { IToken } from "../../App";

interface ITokenElement extends IMyToken {
  selectedTokens: IToken[];
  myTokens: IMyToken[];
  setMyTokens: React.Dispatch<React.SetStateAction<IMyToken[]>>;
}

const TokenElement: FC<ITokenElement> = ({
  id,
  name,
  image,
  amount,
  symbol,
  price,
  priceChange,
  selectedTokens,
  myTokens,
  setMyTokens,
}) => {
  const [input, setInput] = useState(amount?.toString());

  return (
    <li className={styles.element}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <span>{symbol.toUpperCase()}</span>
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
      <span>{`${(Number(input) * price).toFixed(2)}$`}</span>
      <span>{`${price}$`}</span>
      <span className={priceChange > 0 ? styles.green : styles.red}>{`${
        priceChange !== null ? priceChange.toFixed(2) : "-"
      }%`}</span>
      <button
        onClick={() => {
          if (selectedTokens) {
            const index = selectedTokens.findIndex(
              (element) => element.id === id
            );
            selectedTokens.splice(index, 1);
            localStorage.setItem(
              "selectedTokens",
              JSON.stringify(selectedTokens)
            );
            const array = myTokens.filter((element) => element.id !== id);
            setMyTokens([...array]);
          }
        }}
      >
        x
      </button>
    </li>
  );
};

export const TokenSection: FC<{
  selectedTokens: IToken[];
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ selectedTokens, reload, setReload }) => {
  const [myToken, setMyToken] = useState([] as IMyToken[]);

  useEffect(() => {
    const interval = setInterval(() => {
      getInfoToken(selectedTokens).then((array) => setMyToken([...array]));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (reload) {
    getInfoToken(selectedTokens).then((array) => setMyToken([...array]));
    setReload(false);
  }

  return (
    <>
      <h2>My Tokens</h2>
      <ul>
        {myToken.map(({ id, name, image, symbol, price, priceChange }) => {
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
            />
          );
        })}
      </ul>
    </>
  );
};
