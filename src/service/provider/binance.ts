/* eslint-disable import/extensions */
import { Pair, Exchange, IPriceTicker, ExchangeService } from '../types';
import { getPairSymbol, getEventNameOpposite } from '../utils/mapping.js';
import { AbstractProvider } from './AbstractProvider';

const parseTickerData = (data: any) => {
  if (data.e !== '24hrTicker') return;
  const myPair = getEventNameOpposite(data.s.toLowerCase(), Exchange.BINANCE);
  if (!myPair) {
    throw new Error(`invalid pair ${myPair}, ${data.s}`);
  }
  const { c, o, l, h, v, E, p, P } = data;
  const event: IPriceTicker = {
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

export class BinanceService extends AbstractProvider
  implements ExchangeService {
  private ids: { [P in Pair]?: number } = {};

  constructor() {
    super(Exchange.BINANCE, parseTickerData);
  }

  public subscribe = async (pair: Pair) => {
    if (this.ids[pair] !== undefined) {
      console.log('pair already subscribed', Exchange.BINANCE, pair);
      return;
    }
    let id = 0;
    if (this.ids[pair] !== undefined) {
      id = this.ids[pair] + 1;
    }
    console.log('subscribe', pair, id);
    this.ids[pair] = id;
    const data = {
      method: 'SUBSCRIBE',
      params: [`${getPairSymbol(pair, Exchange.BINANCE)}@ticker`],
      id,
    };
    this.send(data);
  };

  public unsubscribe = (pair: Pair) => {
    const data = {
      method: 'UNSUBSCRIBE',
      params: [`${getPairSymbol(pair, Exchange.BINANCE)}@ticker`],
      id: this.ids[pair],
    };
    this.send(data);
    delete this.ids[pair];
  };
}
