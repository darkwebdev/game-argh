'use strict'

const { emit, on, events } = require('./events')
const locations = require('./locations')
const renderView = require('./views')
const { keys, directions, entities } = require('./const')
const { player } = require('./enitity')
const { position } = require('./world')

const rootEl = document.querySelector('#app');
const actions = {
  [keys.ARROW_UP]: () => emit(events.SAIL, directions.NORTH),
  [keys.ARROW_DOWN]: () => emit(events.SAIL, directions.SOUTH),
  [keys.ARROW_LEFT]: () => emit(events.SAIL, directions.WEST),
  [keys.ARROW_RIGHT]: () => emit(events.SAIL, directions.EAST)
}
let state = {}

module.exports = ({ game, config }) => {
  document.addEventListener('keydown', event => {
    emit(events.KEY_PRESSED, event.keyCode);
  });

  on(events.KEY_PRESSED, code => {
    const action = actions[code];
    if (action) {
      action()
    }
  })

  on(events.SAIL, direction => {
    const curPlayer = player(state.entities)
    const newLoc = game.locationAt({ x: curPlayer.x, y: curPlayer.y }, direction)
    const newState = {
      entities: {
        ...state.entities,
        [curPlayer.gid]: {
          ...curPlayer,
          x: newLoc.x,
          y: newLoc.y
        }
      }
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
