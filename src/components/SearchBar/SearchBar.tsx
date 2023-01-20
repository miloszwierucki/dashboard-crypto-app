import { FC, useState } from "react";
import { searchList } from "./searchList";
import styles from "./styles.module.scss";
import { ITokenSearch } from "./searchList";
import { myTokenList } from "../TokenSection/updatePrice";

const ListElement: FC<ITokenSearch> = ({ name, id }) => {
  return (
    <li
      className={styles.element}
      onClick={() => {
        if (!myTokenList.find((element) => element === id)) {
          myTokenList.push(id);
        }
      }}
    >
      {name}
    </li>
  );
};

export const SearchBar = () => {
  const [tokens, setTokens] = useState([] as ITokenSearch[]);
  const [search, setSearch] = useState("");

  return (
    <div className={styles["search-section"]}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          const array: ITokenSearch[] = await searchList();
          setTokens([...array]);
        }}
      >
        Fetch Data
      </button>
      {search && (
        <ul className={styles.list}>
          {tokens
            .filter((element) =>
              element.name.toLowerCase().includes(search.toLowerCase())
            )
            .map(({ id, name }) => {
              return <ListElement key={id} name={name} id={id} />;
            })}
        </ul>
      )}
    </div>
  );
};
