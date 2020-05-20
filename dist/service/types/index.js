export var Pair;
(function (Pair) {
    Pair["BTC_USDT"] = "BTC_USDT";
    Pair["ETH_USDT"] = "ETH_USDT";
})(Pair || (Pair = {}));
export var Exchange;
(function (Exchange) {
    Exchange["BINANCE"] = "BINANCE";
})(Exchange || (Exchange = {}));
export const pairMap = {
    [Exchange.BINANCE]: {
        [Pair.BTC_USDT]: 'btcusdt',
        [Pair.ETH_USDT]: 'ethusdt',
    },
};
//# sourceMappingURL=index.js.map