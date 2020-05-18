import { Pair, Exchange, pairMap } from '../types';

export const getPairSymbol = (pair: Pair, exchange: Exchange): string => {
  return pairMap[exchange][pair];
};

export const getEventName = (pair: Pair, exchange: Exchange): string => {
  return `${exchange}-${pair}`;
};

export const getEventNameOpposite = (
  pair: string,
  exchange: Exchange
): Pair | null => {
  let myPair: Pair | null = null;
  const pairs = pairMap[exchange];
  Object.keys(pairs).some(key => {
    if (pairs[key as Pair] === pair) {
      myPair = key as Pair;
      return true;
    }
  });
  return myPair;
};
