import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { IMyToken } from "../TokenSection/updatePrice";
import { IToken } from "../../App";

interface ITokenElement extends IMyToken {
  selectedTokens: IToken[];
  myTokens: IMyToken[];
  setSum: React.Dispatch<number>;
  setMyTokens: React.Dispatch<React.SetStateAction<IMyToken[]>>;
}

export const TokenElement: FC<ITokenElement> = ({
  id,
  name,
  image,
  amount,
  symbol,
  price,
  priceChange,
  selectedTokens,
  myTokens,
  setSum,
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
          selectedTokens.find((element) => element.id === id)!.sum =
            Number(e.target.value) * price;
          const sum = selectedTokens.reduce((acc, element) => {
            return acc + element.sum;
          }, 0);
          localStorage.setItem("sum", JSON.stringify(sum));
          setSum(sum);
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
            setSum(sum);
          }
        }}
      >
        {"??"}
      </button>
    </li>
  );
};
