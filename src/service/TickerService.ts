/* eslint-disable import/extensions */
import { Exchange, ExchangeService, Pair, IPriceTicker } from './types';
import { BinanceService } from './provider/binance.js';
import { EventEmitterInstance } from './event-emitter/index.js';
import { getEventName } from './utils/mapping.js';

const serviceMap = {
  [Exchange.BINANCE]: BinanceService,
};

export class TickerService {
  private providers: { [name in Exchange]?: ExchangeService } = {};

  subscribe = (
    pair: Pair,
    exchange: Exchange,
    event: (data: IPriceTicker) => void
  ): Function => {
    let service: ExchangeService | undefined = this.providers[exchange];
    if (!service) {
      service = new serviceMap[exchange]();
      this.providers[exchange] = service;
    }
    const off = EventEmitterInstance.on(getEventName(pair, exchange), event);
    service.subscribe(pair);
    return off;
  };

  unsubscribe = (
    pair: Pair,
    exchange: Exchange,
    event: (data: IPriceTicker) => void
  ): void => {
    const service: ExchangeService | undefined = this.providers[exchange];
    if (!service) {
      throw new Error(`service is not available ${exchange}`);
    }
    const available = EventEmitterInstance.off(
      getEventName(pair, exchange),
      event
    );
    if (available !== undefined && available < 1) {
      const service = this.providers[exchange];
      if (!service) return;
      service.subscribe(pair);
      service.close();
      delete this.providers[exchange];
    }
  };
}
