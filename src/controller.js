'use strict'

this._.Controller = ((_) => {
  const { emit, on, events } = _.events
  // const { steps } = require('./const');

  let state = {}

  return game => {
    on(events.UPDATE_STATE, newState => {
      state = { ...state, ...newState }

      emit(events.STATE_CHANGED, state)
    })

    on(events.STATE_CHANGED, newState => {
      _.render({
        state: newState,
        game,
        root: '#app'
      })
    })
  }
})(this._)

if (typeof module !== 'undefined') {
  module.exports = global
}
