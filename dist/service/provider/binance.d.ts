import { Pair, ExchangeService } from '../types';
import { AbstractProvider } from './AbstractProvider';
export declare class BinanceService extends AbstractProvider implements ExchangeService {
    private ids;
    constructor();
    subscribe: (pair: Pair) => Promise<void>;
    unsubscribe: (pair: Pair) => void;
}
