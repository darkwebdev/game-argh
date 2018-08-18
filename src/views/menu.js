'use strict'

const { events } = require('../events')
const { directions } = require('../const')

const arrows = {
  [directions.NORTH]: 'Up',
  [directions.EAST]: 'Right',
  [directions.SOUTH]: 'Down',
  [directions.WEST]: 'Left',
}
const menuStrings = {
  [events.NEW_GAME]: () => `Start a new game (N)`,
  [events.SAIL]: ({ direction }) => `Sail ${direction} (${arrows[direction]})`,
  [events.SHOP]: ({ entityId }) => `Buy, sell, upgrade at ${entityId} (B)`, //todo: port name here
  [events.TRADE]: ({ entityId }) => `Trade with ${entityId} (T)`, //todo: ship name here
  [events.FIGHT]: ({ entityId }) => `Attack ${entityId} (A)` //todo: ship name here
}

module.exports = ({ state }) =>
  (state.actions || []).map(item =>
    `<button onclick="window.emit('${item.event}', ${item.entityId})">
      ${menuStrings[item.event](item)}
    </button>`
  ).join('')
