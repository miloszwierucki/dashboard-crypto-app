import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { IMyToken } from "../TokenSection/updatePrice";
import { IToken } from "../../App";

interface ITokenElement extends IMyToken {
  selectedTokens: IToken[];
  myTokens: IMyToken[];
  setMyTokens: React.Dispatch<React.SetStateAction<IMyToken[]>>;
}

export const WhitelistTokenElement: FC<ITokenElement> = ({
  id,
  name,
  image,
  symbol,
  price,
  priceChange,
  selectedTokens,
  myTokens,
  setMyTokens,
}) => {
  return (
    <li className={styles.elementWhiteList}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <span>{symbol.toUpperCase()}</span>
      <span>{`${price !== null ? price : "-"}$`}</span>
      <span className={priceChange > 0 ? styles.green : styles.red}>{`${
        priceChange !== null ? priceChange.toFixed(2) : "-"
      }%`}</span>
      <button
        onClick={() => {
          if (selectedTokens) {
            const index = selectedTokens.findIndex(
              (element) => element.id === id
            );
            selectedTokens[index].owned = true;
            const array = myTokens;
            array.find((element) => element.id === id)!.owned = true;
            setMyTokens([...array]);

            localStorage.setItem(
              "selectedTokens",
              JSON.stringify(selectedTokens)
            );
          }
        }}
      >
        {"<-"}
      </button>
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

            const sum = selectedTokens.reduce((acc, element) => {
              return acc + element.sum;
            }, 0);
            localStorage.setItem("sum", JSON.stringify(sum));
          }
        }}
      >
        x
      </button>
    </li>
  );
};
