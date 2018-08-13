'use strict'

const { emit, on, events } = require('./events')
const locations = require('./locations')
const renderView = require('./views')

const rootEl = document.querySelector('#app');
let state = {}

module.exports = ({ game, config }) => {
  on(events.SAIL, () => {
    const newState = {
      location: locations.SEA
    }
    emit(events.UPDATE_STATE, newState)
  })

  on(events.UPDATE_STATE, newState => {
    state = { ...state, ...newState }

    emit(events.STATE_CHANGED, state)
  })

  on(events.STATE_CHANGED, newState => {
    console.log('STATE', newState)
    rootEl.innerHTML = renderView({
      state: newState,
      config
    })
  })
}
