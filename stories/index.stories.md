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

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add crypto-ticker
```

```js
import 'crypto-ticker/crypto-ticker.js';
```

```js preview-story
export const Simple = () => html`
  <crypto-ticker></crypto-ticker>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <crypto-ticker title="Hello World"></crypto-ticker>
`;
```
