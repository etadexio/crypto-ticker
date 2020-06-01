```js script
import { html } from '@open-wc/demoing-storybook';
import '../dist/index.js';

export default {
  title: 'WebCryptoTicker',
  component: 'web-crypto-ticker',
  options: { selectedPanel: 'storybookjs/knobs/panel' },
};
```

# CryptoTicker

A component for realtime crypto prices

## Features:

- stream prices data

## How to use

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="node_modules/web-crypto-ticker"></script>
  </head>
  <body>
    <web-crypto-ticker
      pair="BTC_USDT"
      exchange="BINANCE"
      stream="onStream()"
    ></web-crypto-ticker>
  </body>
</html>
```

### Installation

```bash
yarn add web-crypto-ticker
#or
npm i web-crypto-ticker
```

```js
import 'web-crypto-ticker';
```

### Example

```js preview-story
const handleStream = ({ detail }) => {
  const elms = document.querySelectorAll('.price');

  elms.forEach(elm => {
    elm.innerText = `$ ${Number(detail.close).toFixed(4)}`;
  });
};

export const Simple = () => html`
  <web-crypto-ticker
    pair="BTCUSDT"
    exchange="BINANCE"
    @stream=${handleStream}
  ></web-crypto-ticker>
  <span class="price">loading...</span>
`;
```
