import { html, LitElement, property, customElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import BigNumber from 'bignumber.js';

import styles from './styles/ticker.styles';

export interface PriceData {
  s: string;
  c: number;
  lastc: number;
  p: number;
  P: number;
}

@customElement('price-tracker')
export class CryptoTicker extends LitElement {
  static styles = styles;

  @property({ attribute: false }) priceData?: PriceData;

  render() {
    if (!this.priceData?.s) return;
    const { s, c, lastc, p, P } = this.priceData;
    const isPriceRateUp = new BigNumber(c).gte(new BigNumber(lastc));

    return html`
      <div
        class=${classMap({
          root: true,
          [s]: true,
        })}
      >
        <div class="content">
          <div>
            <span class="label">${s}: </span
            ><span
              class=${classMap({
                lastPrice: true,
                success: isPriceRateUp,
                danger: !isPriceRateUp,
              })}
              >${// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              new BigNumber(c).toFormat(null, 1)}</span
            >
          </div>
          <span
            class=${classMap({
              changePrice: true,
              success: p > 0,
              danger: p < 0,
            })}
            >${// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            new BigNumber(p).toFormat(null, 1)}
            <span>
              ${new BigNumber(P).toFormat(2, 1)}%
            </span>
          </span>
        </div>
      </div>
    `;
  }
}
