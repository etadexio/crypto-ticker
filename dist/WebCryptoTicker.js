import { __decorate } from "tslib";
import { LitElement, property } from "lit-element";
import TickerService from "./service";
import { Exchange } from "./service/types/index";
export class WebCryptoTicker extends LitElement {
    constructor() {
        super(...arguments);
        this.exchange = Exchange.BINANCE;
        this._onData = (data) => {
            const evt = new CustomEvent("stream", { detail: data });
            this.dispatchEvent(evt);
        };
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.pair && this.exchange) {
            TickerService.subscribe(this.pair, this.exchange, this._onData);
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.pair && this.exchange) {
            TickerService.unsubscribe(this.pair, this.exchange, this._onData);
        }
    }
    update(prev) {
        if (prev.has("pair") || prev.has("exchange")) {
            const pair = prev.get("pair") || this.pair;
            const exchange = prev.get("exchange") || this.exchange;
            TickerService.unsubscribe(pair, exchange, this._onData);
            if (this.pair && this.exchange) {
                TickerService.subscribe(this.pair, this.exchange, this._onData);
            }
        }
    }
}
__decorate([
    property({ type: String, attribute: true })
], WebCryptoTicker.prototype, "pair", void 0);
__decorate([
    property({ type: String, attribute: true })
], WebCryptoTicker.prototype, "exchange", void 0);
//# sourceMappingURL=WebCryptoTicker.js.map