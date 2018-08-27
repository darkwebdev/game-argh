const { emit, on, events } = require('./events')
const { keys, directions, terrains } = require('./const')

module.exports = {
  [keys.ARROW_UP]: trySail(directions.NORTH),
  [keys.ARROW_DOWN]: trySail(directions.SOUTH),
  [keys.ARROW_LEFT]: trySail(directions.WEST),
  [keys.ARROW_RIGHT]: trySail(directions.EAST),
  [keys.A]: tryAction(events.FIGHT, 'entityId'),
  [keys.N]: tryAction(events.NEW_GAME),
  [keys.T]: tryAction(events.TRADE, 'entityId'),
  [keys.R]: tryAction(events.REPAIR, 'entityId'),
  [keys.U]: tryAction(events.UPGRADE, 'entityId'),
}

function tryAction(event, prop) {
  return actions => {
    const action = actions.find(a => a.event === event)

    if (action) {
      emit(event, action[prop])
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
