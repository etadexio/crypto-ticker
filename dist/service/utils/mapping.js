import { pairMap } from '../types';
export const getPairSymbol = (pair, exchange) => {
    return pairMap[exchange][pair];
};
export const getEventName = (pair, exchange) => {
    return `${exchange}-${pair}`;
};
export const getEventNameOpposite = (pair, exchange) => {
    let myPair = null;
    const pairs = pairMap[exchange];
    Object.keys(pairs).some(key => {
        if (pairs[key] === pair) {
            myPair = key;
            return true;
        }
    });
    return myPair;
};
//# sourceMappingURL=mapping.js.map