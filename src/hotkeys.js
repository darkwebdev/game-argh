const { emit, EVENTS } = require('./events')
const { DIRECTIONS } = require('./const')

module.exports = {
  ArrowUp: trySail(DIRECTIONS.NORTH),
  ArrowDown: trySail(DIRECTIONS.SOUTH),
  ArrowLeft: trySail(DIRECTIONS.WEST),
  ArrowRight: trySail(DIRECTIONS.EAST),
  KeyA: tryAction(EVENTS.FIGHT),
  KeyB: tryAction(EVENTS.BOMB),
  KeyN: tryAction(EVENTS.NEW_GAME),
  KeyT: tryAction(EVENTS.TRADE),
  KeyR: tryAction(EVENTS.REPAIR),
  KeyU: tryAction(EVENTS.UPGRADE),
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
    const action = actions.find(a => a.event === EVENTS.SAIL && a.direction === direction)

    if (action) {
      emit(EVENTS.SAIL, direction)
    }
  }
}
