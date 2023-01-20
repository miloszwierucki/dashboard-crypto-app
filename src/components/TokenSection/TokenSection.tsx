import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { IMyToken, getInfoToken } from "../TokenSection/updatePrice";

const TokenElement: FC<IMyToken> = ({
  name,
  image,
  symbol,
  price,
  priceChange,
}) => {
  return (
    <li className={styles.element}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{symbol.toUpperCase()}</p>
      <p>{`${price}$`}</p>
      <p
        className={priceChange > 0 ? styles.green : styles.red}
      >{`${priceChange.toFixed(2)}%`}</p>
    </li>
  );
};

export const TokenSection = () => {
  const [myToken, setMyToken] = useState([] as IMyToken[]);

  return (
    <>
      <button
        onClick={async () => {
          const tokenList = await getInfoToken();
          setMyToken([...tokenList]);
        }}
      >
        Refresh myTokenList and update Price
      </button>
      <ul>
        {myToken.map(({ id, name, image, symbol, price, priceChange }) => {
          return (
            <TokenElement
              key={id}
              name={name}
              image={image}
              symbol={symbol}
              price={price}
              priceChange={priceChange}
            />
          );
        })}
      </ul>
    </>
  );
};
