"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
exports.getPairSymbol = (pair, exchange) => {
    return types_1.pairMap[exchange][pair];
};
exports.getEventName = (pair, exchange) => {
    return `${exchange}-${pair}`;
};
exports.getEventNameOpposite = (pair, exchange) => {
    let myPair = null;
    const pairs = types_1.pairMap[exchange];
    Object.keys(pairs).some(key => {
        if (pairs[key] === pair) {
            myPair = key;
            return true;
        }
    });
    return myPair;
};
