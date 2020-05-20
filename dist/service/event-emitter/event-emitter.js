export class EventEmitter {
    constructor() {
        this.listeners = {};
        this.on = (type, fn) => {
            let listeners = this.listeners[type];
            if (!listeners) {
                listeners = [];
                this.listeners[type] = listeners;
            }
            listeners.push(fn);
            return () => this.off(type, fn);
        };
        this.off = (type, fn) => {
            if (!this.listeners)
                return;
            const listeners = this.listeners[type];
            if (!listeners)
                return;
            this.listeners[type] = listeners.filter(f => f !== fn);
            return this.listeners[type].length;
        };
        this.emit = (type, data) => {
            if (!this.listeners)
                return;
            const listeners = this.listeners[type];
            if (!listeners)
                return;
            listeners.forEach(async (fn) => fn(data));
        };
    }
}
//# sourceMappingURL=event-emitter.js.map