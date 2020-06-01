import { html, fixture, expect } from '@open-wc/testing';

import { WebCryptoTicker } from '../src/WebCryptoTicker.js';
import '../index.js';

describe('CryptoTicker', () => {
  it('passes the a11y audit', async () => {
    const el: WebCryptoTicker = await fixture(html`
      <web-crypto-ticker></web-crypto-ticker>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
