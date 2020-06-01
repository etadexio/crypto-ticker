import { LitElement, property } from "lit-element";
import TickerService from "./service";
import { IPriceTicker, Pair, Exchange } from "./service/types/index";

export class WebCryptoTicker extends LitElement {
  @property({ type: String, attribute: true })
  pair?: Pair;
  @property({ type: String, attribute: true })
  exchange: Exchange = Exchange.BINANCE;

  connectedCallback() {
    super.connectedCallback();
    if (this.pair && this.exchange) {
      TickerService.subscribe(this.pair, this.exchange, this._onData);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.pair && this.exchange) {
      TickerService.unsubscribe(this.pair, this.exchange, this._onData);
    }
  }

  update(prev: Map<string, any>) {
    if (prev.has("pair") || prev.has("exchange")) {
      const pair = prev.get("pair") || this.pair;
      const exchange = prev.get("exchange") || this.exchange;
      TickerService.unsubscribe(pair, exchange, this._onData);
      if (this.pair && this.exchange) {
        TickerService.subscribe(this.pair, this.exchange, this._onData);
      }
    }
  }

  private _onData = (data: IPriceTicker) => {
    const evt = new CustomEvent("stream", { detail: data });
    this.dispatchEvent(evt);
  };
}
