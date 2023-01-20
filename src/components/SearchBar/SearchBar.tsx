import { FC, useState } from "react";
import { updatePrice } from "./updatePrice";
import styles from "./styles.module.scss";
import { IToken } from "./updatePrice";

interface ITokenElement extends IToken {
  isAcitive: boolean;
}

const ListElement: FC<ITokenElement> = ({
  symbol,
  name,
  image,
  price,
  isAcitive,
}) => {
  return (
    <>
      {isAcitive ? (
        <li className={styles.element}>
          <img src={image} alt={name} />
          <p>{symbol}</p>
          <p>{name}</p>
          <p>{price}</p>
        </li>
      ) : (
        <></>
      )}
    </>
  );
};

export const SearchBar = () => {
  const [count, setCount] = useState(0);
  const [isAcitive, setIsAcitive] = useState(false);
  const [tokens, setTokens] = useState<IToken[]>([]);
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onFocus={() => {
          setIsAcitive(!isAcitive);
        }}
      />
      <button
        onClick={async () => {
          setCount((count) => count + 1);
          const array: IToken[] = await updatePrice(count);
          setTokens([...tokens, ...array]);

          console.log(tokens);
        }}
      ></button>
      {tokens.map(({ symbol, name, image, price }) => {
        return (
          <ListElement
            key={symbol}
            symbol={symbol}
            name={name}
            image={image}
            price={price}
            isAcitive={isAcitive}
          />
        );
      })}
    </div>
  );
};
