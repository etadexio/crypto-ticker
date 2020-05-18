import { html, LitElement, property } from 'lit-element';

// eslint-disable-next-line import/no-duplicates
// eslint-disable-next-line import/extensions
import { PriceData } from './Traker';
import './Traker.ts';

import CARD_STYLES from './styles/card.styles';

export interface Pairs {
  BTCUSD: PriceData;
  ETHUSD: PriceData;
  ETHBTC: PriceData;
}

export class CryptoTicker extends LitElement {
  static styles = [CARD_STYLES];

  @property({ attribute: false })
  data!: Pairs;

  render() {
    return html`
      <div class="card">
        <price-tracker .priceData=${this.data.BTCUSD}></price-tracker>
        <price-tracker .priceData=${this.data.ETHUSD}></price-tracker>
        <price-tracker .priceData=${this.data.ETHBTC}></price-tracker>
      </div>
    `;
  }
}
