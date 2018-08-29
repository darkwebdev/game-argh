const { emit, events } = require('./events')
const { keys, directions } = require('./const')

module.exports = {
  [keys.ARROW_UP]: trySail(directions.NORTH),
  [keys.ARROW_DOWN]: trySail(directions.SOUTH),
  [keys.ARROW_LEFT]: trySail(directions.WEST),
  [keys.ARROW_RIGHT]: trySail(directions.EAST),
  [keys.A]: tryAction(events.FIGHT),
  [keys.B]: tryAction(events.BOMB),
  [keys.N]: tryAction(events.NEW_GAME),
  [keys.T]: tryAction(events.TRADE),
  [keys.R]: tryAction(events.REPAIR),
  [keys.U]: tryAction(events.UPGRADE),
}

function tryAction(event) {
  return actions => {
    const action = actions.find(a => a.event === event)

    if (action) {
      const { event, ...data } = action

      emit(event, data)
    }
  }
}

function trySail(direction) {
  return actions => {
    const action = actions.find(a => a.event === events.SAIL && a.direction === direction)

    if (action) {
      emit(events.SAIL, direction)
    }
  }
}
