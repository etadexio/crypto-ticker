/* eslint-disable import/extensions */
import { IPriceTicker } from '../types';

export class EventEmitter {
  private listeners: {
    [type: string]: Array<(data: IPriceTicker) => void>;
  } = {};

  public on = (type: string, fn: (data: IPriceTicker) => void): Function => {
    let listeners = this.listeners[type];
    if (!listeners) {
      listeners = [];
      this.listeners[type] = listeners;
    }
    listeners.push(fn);
    return () => this.off(type, fn);
  };

  public off = (
    type: string,
    fn: (data: IPriceTicker) => void
  ): number | void => {
    if (!this.listeners) return;
    const listeners = this.listeners[type];
    if (!listeners) return;
    this.listeners[type] = listeners.filter(f => f !== fn);
    return this.listeners[type].length;
  };

  public emit = (type: string, data: IPriceTicker): void => {
    if (!this.listeners) return;
    const listeners = this.listeners[type];
    if (!listeners) return;
    listeners.forEach(async fn => fn(data));
  };
}
