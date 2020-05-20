"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const mapping_1 = require("../utils/mapping");
const event_emitter_1 = require("../event-emitter");
const wsUrlMap = {
    [types_1.Exchange.BINANCE]: 'wss://stream.binance.com:9443/ws',
};
class AbstractProvider {
    constructor(exchange, parseData) {
        this.exchange = exchange;
        this.parseData = parseData;
        this.pendingRequest = [];
        this.connect();
    }
    close() {
        this.socket.close();
    }
    isConnected() {
        return this.socket.readyState === 1;
    }
    connect() {
        if (!this.socket || this.socket.CLOSING || this.socket.CLOSED) {
            this.socket = new WebSocket(wsUrlMap[this.exchange]);
        }
        if (this.isConnected())
            return;
        this.socket.onopen = () => {
            //('socket connected', this.socket.readyState)
            this.listenMessageEvent();
            this.sendPendingRequest();
        };
    }
    listenMessageEvent() {
        this.socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            const parsed = this.parseData(data);
            if (!parsed)
                return;
            event_emitter_1.EventEmitterInstance.emit(mapping_1.getEventName(parsed.pair, types_1.Exchange.BINANCE), parsed.tickerData);
        };
    }
    sendPendingRequest() {
        while (this.pendingRequest.length) {
            const data = this.pendingRequest.shift();
            //('sending queued request', data)
            this.send(data);
        }
    }
    send(data) {
        if (!this.socket || this.socket.readyState !== 1) {
            //(Exchange.BINANCE, 'socket not ready')
            //(Exchange.BINANCE, 'queuing request')
            this.pendingRequest.push(data);
            return false;
        }
        this.socket.send(JSON.stringify(data));
        return true;
    }
}
exports.AbstractProvider = AbstractProvider;
