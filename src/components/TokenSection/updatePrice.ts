import axios from "axios";
import { IToken } from "../../App";

export interface IMyToken {
  id: string;
  name: string;
  image: string;
  amount?: number;
  symbol: string;
  price: number;
  priceChange: number;
  selectedTokens?: IToken[];
}

export const getInfoToken = async (selectedTokens: IToken[]) => {
  const myTokenList: string[] = selectedTokens.map((token) => token.id);
  const tokensTemp: IMyToken[] = [];

  if (myTokenList.length === 0) return [] as IMyToken[]; // if no tokens selected, return empty array (no need to fetch data

  await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${myTokenList.join()}`
    )
    .then((res) => {
      if (res.data.length === 0) return [] as IMyToken[];
      const data = res.data;
      data.forEach((element: any) => {
        const token: IMyToken = {
          id: element.id,
          name: element.name,
          image: element.image,
          symbol: element.symbol,
          price: element.current_price,
          priceChange: element.price_change_percentage_24h,
        };
        tokensTemp.push(token);
      });
    })
    .catch((err) => console.log("Error at api.coingecko.com data: ", err));

  return tokensTemp;
};
