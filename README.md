# \<crypto-ticker>

A simple web-component to get real time crypto price data.

## Demos

- [React](https://jsfiddle.net/hfa00/wu5ps2hy/34/)

## Support

Can be used in any framework like `React`, `Vue` or in static `html`

## Exchanges

Currently only `binance` is supported

```typescript
export enum Exchange {
  BINANCE = 'BINANCE',
}
```

## Pairs

We will add more pairs in the future

```typescript
export enum Pair {
  BTC_USDT = 'BTC_USDT',
  ETH_USDT = 'ETH_USDT',
}
```

## Data structure

```typescript
export interface IPriceTicker {
  exchange: Exchange;
  pair: Pair;
  close: number;
  open: number;
  low: number;
  high: number;
  volume: number;
  timestamp: number;
  percent: number;
  percent_abs: number;
}
```

## Installation

```bash
npm i web-crypto-ticker
#or
yarn add web-crypto-ticker
```

## Usage

```html
<script type="module">
  import 'crypto-ticker/crypto-ticker.js';
</script>

<crypto-ticker
  pair="BTC_USDT"
  exchange="BINANCE"
  stream="onStream()"
></crypto-ticker>
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```
