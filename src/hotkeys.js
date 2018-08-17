'use strict'

const { emit, on, events } = require('./events')
const { keys, directions, terrains } = require('./const')

module.exports = {
  [keys.ARROW_UP]: () => emit(events.SAIL, directions.NORTH),
  [keys.ARROW_DOWN]: () => emit(events.SAIL, directions.SOUTH),
  [keys.ARROW_LEFT]: () => emit(events.SAIL, directions.WEST),
  [keys.ARROW_RIGHT]: () => emit(events.SAIL, directions.EAST),
  [keys.A]: (actions) => {
    const action = actions.find(a => a.event === events.FIGHT)

    if (action) {
      emit(events.FIGHT, action.entityId)
    }
  }
}
