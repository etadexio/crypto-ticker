"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
const types_1 = require("./types");
const binance_js_1 = require("./provider/binance.js");
const index_js_1 = require("./event-emitter/index.js");
const mapping_js_1 = require("./utils/mapping.js");
const serviceMap = {
    [types_1.Exchange.BINANCE]: binance_js_1.BinanceService,
};
class TickerService {
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
            index_js_1.EventEmitterInstance.on(mapping_js_1.getEventName(pair, exchange), event);
            service.subscribe(pair);
            return () => this.unsubscribe(pair, exchange, event);
        };
        this.unsubscribe = (pair, exchange, event) => {
            const service = this.providers[exchange];
            if (!service) {
                throw new Error(`service is not available ${exchange}`);
            }
            const available = index_js_1.EventEmitterInstance.off(mapping_js_1.getEventName(pair, exchange), event);
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
exports.TickerService = TickerService;
