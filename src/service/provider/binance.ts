/* eslint-disable import/extensions */
import { Pair, Exchange, IPriceTicker, ExchangeService } from '../types';
import {
  getPairSymbol,
  getEventName,
  getEventNameOpposite,
} from '../utils/mapping.js';
import { EventEmitterInstance } from '../event-emitter/index.js';

export class BinanceService implements ExchangeService {
  private socket: WebSocket;
  private ids: { [P in Pair]?: number } = {};

  public subscribe = async (pair: Pair) => {
    if (this.ids[pair]) {
      console.log('socket already subscribed', Exchange.BINANCE);
      return;
    }
    let id = 0;

    if (this.ids[pair] !== undefined) {
      id = this.ids[pair] + 1;
    }
    const data = {
      method: 'SUBSCRIBE',
      params: [`${getPairSymbol(pair, Exchange.BINANCE)}@ticker`],
      id,
    };
    const sent = this.send(data);
    if (!sent) return;

    this.ids[pair] = id;
  };

  public unsubscribe = (pair: Pair) => {
    const data = {
      method: 'UNSUBSCRIBE',
      params: [`${getPairSymbol(pair, Exchange.BINANCE)}@ticker`],
      id: this.ids[pair],
    };
    const sent = this.send(data);
    if (!sent) return;
    delete this.ids[pair];
  };

  private send(data: any): boolean {
    if (this.socket.readyState !== 1) {
      console.log('socket not ready', Exchange.BINANCE);
      return false;
    }
    console.log(data);
    this.socket.send(JSON.stringify(data));
    return true;
  }

  close() {
    this.socket.close();
  }

  async connect() {
    if (!this.socket) {
      this.socket = new WebSocket('wss://stream.binance.com:9443/ws');
    }
    if (this.socket.readyState === 1) return;
    return new Promise<void>((rs, rj) => {
      this.socket.onopen = () => {
        console.log('socket connected', this.socket.readyState);
        this.listenMessageEvent();
        rs();
      };
    });
  }

  listenMessageEvent() {
    this.socket.onmessage = (message: any) => {
      const data = JSON.parse(message.data);
      // console.log(data);
      if (data.e !== '24hrTicker') return;
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
}
