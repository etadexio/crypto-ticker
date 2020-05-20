/* eslint-disable import/extensions */
import { Exchange } from './types';
import { BinanceService } from './provider/binance.js';
import { EventEmitterInstance } from './event-emitter/index.js';
import { getEventName } from './utils/mapping.js';
const serviceMap = {
    [Exchange.BINANCE]: BinanceService,
};
export class TickerService {
    constructor() {
        this.providers = {};
        this.subscribe = (pair, exchange, event) => {
            let service = this.providers[exchange];
            if (!service) {
                //('init service', exchange)
                const serviceConstructor = serviceMap[exchange];
                if (!serviceConstructor) {
                    throw new Error(`unknown service ${exchange}`);
                }
                service = new serviceConstructor();
                this.providers[exchange] = service;
            }
            EventEmitterInstance.on(getEventName(pair, exchange), event);
            service.subscribe(pair);
            return () => this.unsubscribe(pair, exchange, event);
        };
        this.unsubscribe = (pair, exchange, event) => {
            const service = this.providers[exchange];
            if (!service) {
                throw new Error(`service is not available ${exchange}`);
            }
            const available = EventEmitterInstance.off(getEventName(pair, exchange), event);
            if (available !== undefined && available < 1) {
                const service = this.providers[exchange];
                if (!service)
                    return;
                service.unsubscribe(pair);
                service.close();
                delete this.providers[exchange];
            }
        };
    }
}
//# sourceMappingURL=TickerService.js.map