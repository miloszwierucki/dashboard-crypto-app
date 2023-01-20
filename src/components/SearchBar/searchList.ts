import axios from "axios";

export interface ITokenSearch {
  name: string;
  id?: string;
}

export const searchList = async () => {
  const tokensTemp: ITokenSearch[] = [];
  await axios.get(`https://api.coingecko.com/api/v3/coins/list`).then((res) => {
    const data = res.data;
    data.forEach((element: any) => {
      const token = {
        symbol: element.symbol,
        name: element.name,
      };
      tokensTemp.push(token);
    });
  });

  return tokensTemp;
};
