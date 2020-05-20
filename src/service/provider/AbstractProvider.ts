import { IPriceTicker, Exchange, Pair } from '../types';
import { getEventName } from '../utils/mapping';
import { EventEmitterInstance } from '../event-emitter';

const wsUrlMap = {
  [Exchange.BINANCE]: 'wss://stream.binance.com:9443/ws',
};

export abstract class AbstractProvider {
  private socket: WebSocket;
  private pendingRequest: any[] = [];
  constructor(
    private exchange: Exchange,
    private parseData: (data: any) => { pair: Pair; tickerData: IPriceTicker }
  ) {
    this.connect();
  }

  close() {
    this.socket.close();
  }

  protected isConnected() {
    return this.socket.readyState === 1;
  }

  protected connect() {
    if (!this.socket || this.socket.CLOSING || this.socket.CLOSED) {
      this.socket = new WebSocket(wsUrlMap[this.exchange]);
    }
    if (this.isConnected()) return;
    this.socket.onopen = () => {
      console.log('socket connected', this.socket.readyState);
      this.listenMessageEvent();
      this.sendPendingRequest();
    };
  }

  listenMessageEvent() {
    this.socket.onmessage = (message: any) => {
      const data = JSON.parse(message.data);
      const parsed = this.parseData(data);

      if (!parsed) return;
      EventEmitterInstance.emit(
        getEventName(parsed.pair, Exchange.BINANCE),
        parsed.tickerData
      );
    };
  }

  private sendPendingRequest() {
    while (this.pendingRequest.length) {
      const data = this.pendingRequest.shift();
      console.log('sending queued request', data);
      this.send(data);
    }
  }

  protected send(data: any): boolean {
    if (!this.socket || this.socket.readyState !== 1) {
      console.log(Exchange.BINANCE, 'socket not ready');
      console.log(Exchange.BINANCE, 'queuing request');
      this.pendingRequest.push(data);
      return false;
    }
    this.socket.send(JSON.stringify(data));
    return true;
  }
}
