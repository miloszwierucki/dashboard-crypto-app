import axios from "axios";

export interface IToken {
  symbol: string;
  name: string;
  image: string;
  price: number;
  priceChange24h?: number;
}

export const updatePrice = async (page: number) => {
  const tokensTemp: IToken[] = [];
  await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=${page}`
    )
    .then((res) => {
      const data = res.data;
      data.forEach((element: any) => {
        const token: IToken = {
          symbol: element.symbol,
          name: element.name,
          image: element.image,
          price: element.current_price,
          priceChange24h: element.price_change_percentage_24h,
        };
        tokensTemp.push(token);
      });
    });
  return tokensTemp;
};
