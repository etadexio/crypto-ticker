export enum Pair {
  BTC_USDT = 'BTC_USDT',
}

export enum Exchange {
  BINANCE = 'BINANCE',
}

export const pairMap = {
  [Exchange.BINANCE]: {
    [Pair.BTC_USDT]: 'btcusdt',
  },
};

export interface IPriceTicker {
  e: Exchange;
  s: Pair;
  c: number;
  o: number;
  l: number;
  h: number;
  v: number;
  lastc: number;
  p: number;
  P: number;
}

export interface ExchangeService {
  subscribe: (pair: Pair) => void;
  unsubscribe: (...args: any[]) => void;
  close: () => void;
  connect: () => Promise<void>;
}
