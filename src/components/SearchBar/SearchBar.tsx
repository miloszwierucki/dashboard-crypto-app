import { FC, useState } from "react";
import { searchList } from "./searchList";
import styles from "./styles.module.scss";
import { ITokenSearch } from "./searchList";

const ListElement: FC<ITokenSearch> = ({ name }) => {
  return (
    <li className={styles.element}>
      <button>{name}</button>
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

          console.log(tokens);
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
              return <ListElement key={id} name={name} />;
            })}
        </ul>
      )}
    </div>
  );
};
