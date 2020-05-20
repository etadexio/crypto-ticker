"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable import/extensions */
/* eslint-disable import/no-duplicates */
const lit_element_1 = require("lit-element");
const service_1 = require("./service");
const index_1 = require("./service/types/index");
class CryptoTicker extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.exchange = index_1.Exchange.BINANCE;
        this._onData = (data) => {
            const evt = new CustomEvent('stream', { detail: data });
            this.dispatchEvent(evt);
        };
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.pair && this.exchange) {
            service_1.default.subscribe(this.pair, this.exchange, this._onData);
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.pair && this.exchange) {
            service_1.default.unsubscribe(this.pair, this.exchange, this._onData);
        }
    }
    update(prev) {
        if (prev.has('pair') || prev.has('exchange')) {
            const pair = prev.get('pair') || this.pair;
            const exchange = prev.get('exchange') || this.exchange;
            service_1.default.unsubscribe(pair, exchange, this._onData);
            if (this.pair && this.exchange) {
                service_1.default.subscribe(this.pair, this.exchange, this._onData);
            }
        }
    }
}
tslib_1.__decorate([
    lit_element_1.property({ type: String, attribute: true })
], CryptoTicker.prototype, "pair", void 0);
tslib_1.__decorate([
    lit_element_1.property({ type: String, attribute: true })
], CryptoTicker.prototype, "exchange", void 0);
exports.CryptoTicker = CryptoTicker;
