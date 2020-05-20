"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pair;
(function (Pair) {
    Pair["BTC_USDT"] = "BTC_USDT";
    Pair["ETH_USDT"] = "ETH_USDT";
})(Pair = exports.Pair || (exports.Pair = {}));
var Exchange;
(function (Exchange) {
    Exchange["BINANCE"] = "BINANCE";
})(Exchange = exports.Exchange || (exports.Exchange = {}));
exports.pairMap = {
    [Exchange.BINANCE]: {
        [Pair.BTC_USDT]: 'btcusdt',
        [Pair.ETH_USDT]: 'ethusdt',
    },
};
