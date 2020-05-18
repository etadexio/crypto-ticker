import { html, fixture, expect } from '@open-wc/testing';

import { CryptoTicker } from '../src/CryptoTicker.js';
import '../crypto-ticker.js';

describe('CryptoTicker', () => {
  it('passes the a11y audit', async () => {
    const el: CryptoTicker = await fixture(html`
      <crypto-ticker></crypto-ticker>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
