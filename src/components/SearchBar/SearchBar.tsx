import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { tokens, ITokenSearch } from "./searchList";
import { IToken } from "../../App";

interface ISetSelectedTokens extends ITokenSearch {
  selectedTokens: IToken[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListElement: FC<ISetSelectedTokens> = ({
  name,
  id,
  selectedTokens,
  setSearch,
  setReload,
}) => {
  return (
    <li
      className={styles.element}
      onClick={() => {
        if (!selectedTokens.find((element) => element.id === id)) {
          selectedTokens.push({ id, amount: 0, sum: 0 });
          localStorage.setItem(
            "selectedTokens",
            JSON.stringify(selectedTokens)
          );
          setReload(true);
          setSearch("");
        }
      }}
    >
      {name}
    </li>
  );
};

export const SearchBar: FC<{
  selectedTokens: IToken[];
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ selectedTokens, setReload }) => {
  const [search, setSearch] = useState("");

  return (
    <div className={styles["search-section"]}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {search && (
        <ul className={styles.list}>
          {tokens
            .filter(
              (element) =>
                element.name.toLowerCase().includes(search.toLowerCase()) ||
                element.symbol?.toLowerCase().includes(search.toLowerCase())
            )
            .map(({ id, name }) => {
              return (
                <ListElement
                  key={id}
                  name={name}
                  id={id}
                  selectedTokens={selectedTokens}
                  setReload={setReload}
                  setSearch={setSearch}
                />
              );
            })}
        </ul>
      )}
    </div>
  );
};
