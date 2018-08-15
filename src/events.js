'use strict'

const subscribers = {}

const subscribe = (event, cb) => {
  subscribers[event] = (subscribers[event] || []).concat([cb])
}

module.exports = {
  events: {
    KEY_PRESSED: 'key-pressed',
    UPDATE_STATE: 'update-state',
    STATE_CHANGED: 'state-changed',
    ENTITY_DESTROYED: 'entity-destroyed',
    SAIL: 'sail',
    SHOP: 'shop',
    TRADE: 'trade',
    FIGHT: 'fight'
  },

  on(event, cb) {
    subscribe(event, cb);
  },

  off(event, cb) { // todo: simplify design
    subscribers[event] = (subscribers[event] || []).filter(ccb => ccb !== cb)
  },

  emit(event, data) {
    console.log('EMIT', event, data);
    (subscribers[event] || []).forEach(cb => cb(data))
  }
}
