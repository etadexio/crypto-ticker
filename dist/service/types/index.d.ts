export declare enum Pair {
    BTC_USDT = "BTC_USDT",
    ETH_USDT = "ETH_USDT"
}
export declare enum Exchange {
    BINANCE = "BINANCE"
}
export declare const pairMap: {
    BINANCE: {
        BTC_USDT: string;
        ETH_USDT: string;
    };
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
