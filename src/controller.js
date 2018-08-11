'use strict'

this._.Controller = ((_) => {
  const { emit, on, events } = _.events

  const rootEl = document.querySelector('#app');
  let state = {}

  return game => {

    on(events.UPDATE_STATE, newState => {
      state = { ...state, ...newState }

      emit(events.STATE_CHANGED, state)
    })

    on(events.STATE_CHANGED, newState => {
      rootEl.innerHTML = _.renderView({
        state: newState,
        game
      })
    })
  }
})(this._)

if (typeof module !== 'undefined') {
  module.exports = global
}
