'use strict'

const subscribers = {}

const subscribe = (event, cb) => {
  subscribers[event] = (subscribers[event] || []).concat([cb])
}

module.exports = {
  events: {
    UPDATE_STATE: 'update-state',
    STATE_CHANGED: 'state-changed',
    SAIL: 'sail',
    SHOP: 'shop'
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