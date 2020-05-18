/* eslint-disable import/extensions */
/* eslint-disable import/no-duplicates */
import { html, LitElement, property } from 'lit-element';

import { PriceData } from './Traker';
import './Traker.js';

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
    if (!this.data) return;
    return html`
      <div class="card">
        <price-tracker .priceData=${this.data.BTCUSD}></price-tracker>
        <price-tracker .priceData=${this.data.ETHUSD}></price-tracker>
        <price-tracker .priceData=${this.data.ETHBTC}></price-tracker>
      </div>
    `;
  }
}
