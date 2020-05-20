/* eslint-disable import/extensions */
import { Exchange } from '../types';
import { getPairSymbol, getEventNameOpposite } from '../utils/mapping.js';
import { AbstractProvider } from './AbstractProvider';
const parseTickerData = (data) => {
    if (data.e !== '24hrTicker')
        return;
    const myPair = getEventNameOpposite(data.s.toLowerCase(), Exchange.BINANCE);
    if (!myPair) {
        throw new Error(`invalid pair ${myPair}, ${data.s}`);
    }
    const { c, o, l, h, v, E, p, P } = data;
    const event = {
        exchange: Exchange.BINANCE,
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
export class BinanceService extends AbstractProvider {
    constructor() {
        super(Exchange.BINANCE, parseTickerData);
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
                params: [`${getPairSymbol(pair, Exchange.BINANCE)}@ticker`],
                id,
            };
            this.send(data);
        };
        this.unsubscribe = (pair) => {
            const data = {
                method: 'UNSUBSCRIBE',
                params: [`${getPairSymbol(pair, Exchange.BINANCE)}@ticker`],
                id: this.ids[pair],
            };
            this.send(data);
            delete this.ids[pair];
        };
    }
}
