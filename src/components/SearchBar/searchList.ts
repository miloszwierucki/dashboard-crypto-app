import axios from "axios";
import { selectedTokens } from "../../App";

export interface ITokenSearch {
  name: string; // search by name
  symbol?: string; // search by symbol
  id: string; // for featch data
}

export let tokens: ITokenSearch[] = [];
window.onload = async () => {
  tokens = await searchList();
};

export const searchList = async () => {
  const tokensTemp: ITokenSearch[] = [];

  await axios
    .get(`https://api.coingecko.com/api/v3/coins/list`)
    .then((res) => {
      if (res.data.length === 0) return [] as ITokenSearch[];
      const data = res.data;
      data.forEach((element: any) => {
        const token = {
          name: element.name,
          symbol: element.symbol,
          id: element.id,
        };
        tokensTemp.push(token);
      });
    })
    .catch((err) => console.log("Error at api.coingecko.com data: ", err));

  return tokensTemp;
};
