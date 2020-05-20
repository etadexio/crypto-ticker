```js script
import { html } from '@open-wc/demoing-storybook';
import '../dist/crypto-ticker.js';

export default {
  title: 'CryptoTicker',
  component: 'crypto-ticker',
  options: { selectedPanel: "storybookjs/knobs/panel" },
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
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="node_modules/crypto-ticker"></script>
</head>
<body>
  <crypto-ticker pair="BTC_USDT" exchange="BINANCE"  stream="onStream()"></crypto-ticker>
</body>
</html>
```

### Installation

```bash
yarn add crypto-ticker
```

```js
import 'crypto-ticker/crypto-ticker.js';
```

### Example

```js preview-story

const handleStream = ({detail}) => {
  const elms = document.querySelectorAll('.price')
  
  elms.forEach(elm => {
    elm.innerText = `$ ${Number(detail.close).toFixed(4)}`
  })
}

export const Simple = () => html`
  <crypto-ticker pair="BTC_USDT" exchange="BINANCE"   @stream=${handleStream}></crypto-ticker>
  <span class="price">loading...</span>
`;
```