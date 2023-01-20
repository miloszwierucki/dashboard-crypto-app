import axios from "axios";

export interface IMyToken {
  id?: string;
  name: string;
  image: string;
  symbol: string;
  price: number;
  priceChange: number;
}

export const myTokenList: string[] = [];

export const getInfoToken = async () => {
  const tokensTemp: IMyToken[] = [];

  await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${myTokenList.join()}`
    )
    .then((res) => {
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
    });

  return tokensTemp;
};
