"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
const types_1 = require("../types");
const mapping_js_1 = require("../utils/mapping.js");
const AbstractProvider_1 = require("./AbstractProvider");
const parseTickerData = (data) => {
    if (data.e !== '24hrTicker')
        return;
    const myPair = mapping_js_1.getEventNameOpposite(data.s.toLowerCase(), types_1.Exchange.BINANCE);
    if (!myPair) {
        throw new Error(`invalid pair ${myPair}, ${data.s}`);
    }
    const { c, o, l, h, v, E, p, P } = data;
    const event = {
        exchange: types_1.Exchange.BINANCE,
        pair: myPair,
        close: c,
        open: o,
        low: l,
        high: h,
        volume: v,
        timestamp: E,
        percent: p,
        percent_abs: P,
    };
    return { pair: myPair, tickerData: event };
};
class BinanceService extends AbstractProvider_1.AbstractProvider {
    constructor() {
        super(types_1.Exchange.BINANCE, parseTickerData);
        this.ids = {};
        this.subscribe = async (pair) => {
            if (this.ids[pair] !== undefined) {
                //('pair already subscribed', Exchange.BINANCE, pair)
                return;
            }
            let id = 0;
            if (this.ids[pair] !== undefined) {
                id = this.ids[pair] + 1;
            }
            //('subscribe', pair, id)
            this.ids[pair] = id;
            const data = {
                method: 'SUBSCRIBE',
                params: [`${mapping_js_1.getPairSymbol(pair, types_1.Exchange.BINANCE)}@ticker`],
                id,
            };
            this.send(data);
        };
        this.unsubscribe = (pair) => {
            const data = {
                method: 'UNSUBSCRIBE',
                params: [`${mapping_js_1.getPairSymbol(pair, types_1.Exchange.BINANCE)}@ticker`],
                id: this.ids[pair],
            };
            this.send(data);
            delete this.ids[pair];
        };
    }
}
exports.BinanceService = BinanceService;
