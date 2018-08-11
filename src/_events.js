'use strict'

this._.events = (() => {
  const subscribers = {}

  function subscribe(event, cb) {
    subscribers[event] = (subscribers[event] || []).concat([cb])
  }

  return {
    events: {
      UPDATE_STATE: 'update-state',
      STATE_CHANGED: 'state-changed'
    },

    on(event, cb) {
      subscribe(event, cb);
    },

    off(event, cb) { // todo: simplify design
      subscribers[event] = (subscribers[event] || []).filter(ccb => ccb !== cb)
    },

    emit(event, data) {
      (subscribers[event] || []).forEach(cb => cb(data))
    }
  }
})()

if (typeof module !== 'undefined') {
  module.exports = global
}
