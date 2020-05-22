import { Exchange, Pair, IPriceTicker } from './types';
export declare class TickerService {
    private providers;
    subscribe: (pair: Pair, exchange: Exchange, event: (data: IPriceTicker) => void) => Function;
    unsubscribe: (pair: Pair, exchange: Exchange, event: (data: IPriceTicker) => void) => void;
}
