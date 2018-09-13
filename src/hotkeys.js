const { emit, EVENTS } = require('./events')
const { DIRECTIONS, EGIDS } = require('./const')

const tryAction = event => actions => {
  const action = actions.find(a => a.event === event)

  if (action) {
    const { event, ...data } = action

    emit(event, data)
  }
}

const trySail = direction => actions => {
  const action = actions.find(a => a.event === EVENTS.SAIL && a.direction === direction)

  if (action) {
    emit(EVENTS.SAIL, direction)
  }
}

const keyThrottle = (cb, delayMs) => {
  let wait
  let lastKey

  return (e) => {
    if (e.code === 'Space' && e.target === document.body) {
      e.preventDefault();
    }

    if (!wait || e.code !== lastKey) {
      if (Element.prototype.scrollIntoViewIfNeeded) {
        const el = document.querySelector(`e[gid="${EGIDS.PLAYER}"]`)
        el && el.scrollIntoViewIfNeeded()
      }

      cb(e.code)
      wait = true

      setTimeout(() => {
        wait = false
      }, delayMs);
    }
    lastKey = e.code
  }
}

module.exports = {
  keyThrottle,
  ArrowUp: trySail(DIRECTIONS.NORTH),
  ArrowDown: trySail(DIRECTIONS.SOUTH),
  ArrowLeft: trySail(DIRECTIONS.WEST),
  ArrowRight: trySail(DIRECTIONS.EAST),
  KeyB: tryAction(EVENTS.BOMB),
  KeyN: () => emit(EVENTS.NEW_GAME),
  KeyR: tryAction(EVENTS.REPAIR),
  KeyU: tryAction(EVENTS.UPGRADE),
  Space: () => emit(EVENTS.END_TURN)
}
