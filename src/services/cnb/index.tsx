import * as React from "react";
import { useQuery } from "react-query";

import { apiUrl } from "./consts";

type Meta = {
  id: string;
  date: string;
};

type ExchangeRate = {
  countryName: string;
  currencyName: string;
  /**
   * @description ISO4217 3 letter e.g. EUR
   */
  currencyCode: string;
  /**
   * @description seems like max 3 decimal places
   */
  rate: number;
};

type Ctx = {
  isLoading: boolean;
  isFetching: boolean;
  meta: Meta | null;
  rates: ExchangeRate[];
  error: unknown;
};

const ctx = React.createContext<Ctx>({
  isFetching: false,
  isLoading: false,
  meta: null,
  rates: [],
  error: null,
});

const fetchCnb = async (): Promise<{
  meta: Meta;
  rates: ExchangeRate[];
}> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  const text = await fetch(apiUrl).then((res) => res.text());
  const lines = text.trim().split("\n");
  const [metaLine, columnNamesLine, ...exchangeRateLines] = lines;
  const [date, id] = metaLine.split(" ");

  const rates: ExchangeRate[] = exchangeRateLines.map((line) => {
    const [countryName, currencyName, amount, currencyCode, rate] =
      line.split("|");

    return {
      countryName,
      currencyName,
      currencyCode,
      // would use a lib to handle currencies (e.g. currency.js)
      rate: Number(rate.replace(/,/g, ".")) / Number(amount), // normalize to 1
    };
  });

  return {
    meta: {
      date,
      id,
    },
    rates: [
      ...rates,
    ],
  };
};

export const CnbProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const { isLoading, error, data, isFetching } = useQuery("cnb", fetchCnb, {});

  return (
    <ctx.Provider
      value={{
        isFetching,
        isLoading,
        error,
        ...(data ? data : { meta: null, rates: [] }),
      }}
    >
      {children}
    </ctx.Provider>
  );
};

export const useCnb = () => React.useContext(ctx);
