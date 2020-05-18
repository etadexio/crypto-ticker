/* eslint-disable import/extensions */
import { Pair, Exchange, IPriceTicker, ExchangeService } from '../types';
import {
  getPairSymbol,
  getEventName,
  getEventNameOpposite,
} from '../utils/mapping.js';
import { EventEmitterInstance } from '../event-emitter/index.js';

export class BinanceService implements ExchangeService {
  private socket = new WebSocket('wss://stream.binance.com:9443/ws');
  private ids: Pair[] = [];
  constructor() {
    this.socket.onmessage = (message: any) => {
      const data = JSON.parse(message);
      const myPair = getEventNameOpposite(
        data.s.toLowerCase(),
        Exchange.BINANCE
      );
      if (!myPair) {
        throw new Error(`invalid pair ${myPair}, ${data.s}`);
      }
      const { c, o, l, h, v, E, p, P } = data;
      const event: IPriceTicker = {
        e: Exchange.BINANCE,
        s: myPair,
        c,
        o,
        l,
        h,
        v,
        lastc: E,
        p,
        P,
      };
      EventEmitterInstance.emit(getEventName(myPair, Exchange.BINANCE), event);
    };
  }
  public subscribe = (pair: Pair) => {
    if (this.ids.find(id => id === pair)) {
      console.log('socket already subscribed', Exchange.BINANCE);
      return;
    }
    const data = {
      method: 'SUBSCRIBE',
      params: [`${getPairSymbol(pair, Exchange.BINANCE)}@ticker`],
      id: pair,
    };
    this.send(data) && this.ids.push(pair);
  };

  public unsubscribe = (pair: Pair) => {
    const index = this.ids.indexOf(pair);
    const data = {
      method: 'UNSUBSCRIBE',
      params: [`${getPairSymbol(pair, Exchange.BINANCE)}@ticker`],
      id: pair,
    };
    this.send(data) && this.ids.splice(index, 1);
  };

  private send(data: any): boolean {
    if (!this.socket.OPEN) {
      console.log('socket not ready', Exchange.BINANCE);
      return false;
    }
    this.socket.send(JSON.stringify(data));
    return true;
  }

  close() {
    this.socket.close();
  }
}
