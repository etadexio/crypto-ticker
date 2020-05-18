/* eslint-disable import/extensions */
/* eslint-disable import/no-duplicates */
import { html, LitElement, property } from 'lit-element';
import TickerService from './service';
import { PriceData } from './Traker';
import './Traker.js';

import CARD_STYLES from './styles/card.styles';
import { Pair, Exchange } from './service/types';
import { IPriceTicker } from './service/types/index';

export interface Pairs {
  BTCUSD: PriceData;
  ETHUSD: PriceData;
  ETHBTC: PriceData;
}

export class CryptoTicker extends LitElement {
  static styles = [CARD_STYLES];

  @property({ attribute: false })
  data: Pairs = {
    BTCUSD: {} as any,
    ETHUSD: {} as any,
    ETHBTC: {} as any,
  };

  connectedCallback() {
    super.connectedCallback();
    TickerService.subscribe(
      Pair.BTC_USDT,
      Exchange.BINANCE,
      data => (this.data = { ...this.data, BTCUSD: data })
    );
    console.log('connected');
  }

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
