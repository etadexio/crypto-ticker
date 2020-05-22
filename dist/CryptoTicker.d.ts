import { LitElement } from "lit-element";
import { Pair, Exchange } from "./service/types/index";
export declare class CryptoTicker extends LitElement {
    pair?: Pair;
    exchange: Exchange;
    connectedCallback(): void;
    disconnectedCallback(): void;
    update(prev: Map<string, any>): void;
    private _onData;
}
