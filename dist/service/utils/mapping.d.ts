import { Pair, Exchange } from '../types';
export declare const getPairSymbol: (pair: Pair, exchange: Exchange) => string;
export declare const getEventName: (pair: Pair, exchange: Exchange) => string;
export declare const getEventNameOpposite: (pair: string, exchange: Exchange) => Pair | null;
