import { IPriceTicker } from '../types';
export declare class EventEmitter {
    private listeners;
    on: (type: string, fn: (data: IPriceTicker) => void) => Function;
    off: (type: string, fn: (data: IPriceTicker) => void) => number | void;
    emit: (type: string, data: IPriceTicker) => void;
}
