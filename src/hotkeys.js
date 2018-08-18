'use strict';

const { emit, on, events } = require('./events')
const { keys, directions, terrains } = require('./const')

module.exports = {
  [keys.ARROW_UP]: actions => {
    const action = actions.find(a => a.event === events.SAIL)

    if (action) {
      emit(events.SAIL, directions.NORTH)
    }
  },
  [keys.ARROW_DOWN]: actions => {
    const action = actions.find(a => a.event === events.SAIL)

    if (action) {
      emit(events.SAIL, directions.SOUTH)
    }
  },
  [keys.ARROW_LEFT]: actions => {
    const action = actions.find(a => a.event === events.SAIL)

    if (action) {
      emit(events.SAIL, directions.WEST)
    }
  },
  [keys.ARROW_RIGHT]: actions => {
    const action = actions.find(a => a.event === events.SAIL)

    if (action) {
      emit(events.SAIL, directions.EAST)
    }
  },
  [keys.A]: actions => {
    const action = actions.find(a => a.event === events.FIGHT)

    if (action) {
      emit(events.FIGHT, action.entityId)
    }
  },
  [keys.N]: actions => {
    const action = actions.find(a => a.event === events.NEW_GAME)

    if (action) {
      emit(events.NEW_GAME)
    }
  }
}
