import { IPriceTicker, Exchange, Pair } from "../types";
export declare abstract class AbstractProvider {
    private exchange;
    private parseData;
    private socket;
    private pendingRequest;
    constructor(exchange: Exchange, parseData: (data: any) => {
        pair: Pair;
        tickerData: IPriceTicker;
    });
    close(): void;
    protected isConnected(): boolean;
    protected connect(): void;
    listenMessageEvent(): void;
    private sendPendingRequest;
    protected send(data: any): boolean;
}
