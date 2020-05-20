export enum Pair {
  BTC_USDT = 'BTC_USDT',
  ETH_USDT = 'ETH_USDT',
}

export enum Exchange {
  BINANCE = 'BINANCE',
}

export const pairMap = {
  [Exchange.BINANCE]: {
    [Pair.BTC_USDT]: 'btcusdt',
    [Pair.ETH_USDT]: 'ethusdt',
  },
};

export interface IPriceTicker {
  exchange: Exchange;
  pair: Pair;
  close: number;
  open: number;
  low: number;
  high: number;
  volume: number;
  timestamp: number;
  percent: number;
  percent_abs: number;
}

export interface ExchangeService {
  subscribe: (pair: Pair) => void;
  unsubscribe: (...args: any[]) => void;
  close: () => void;
}
