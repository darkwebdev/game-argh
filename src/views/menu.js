'use strict'

const { events } = require('../events')
const { directions } = require('../const')

const arrows = {
  [directions.NORTH]: '^', // todo: sprite imgs here
  [directions.EAST]: '>',
  [directions.SOUTH]: 'V',
  [directions.WEST]: '<',
}
const menuItems = {
  [events.NEW_GAME]: () => ({
    text: `Start a new game (N)`,
  }),
  [events.SAIL]: ({ direction }) => ({
    text: `Sail ${direction} (${arrows[direction]})`,
    data: direction,
  }),
  [events.SHOP]: ({ entityId }) => ({
    text: `Buy, sell, upgrade at ${entityId} (B)`, //todo: port name here
    data: entityId,
  }),
  [events.TRADE]: ({ entityId }) => ({
    text: `Trade with ${entityId} (T)`, //todo: ship name here
    data: entityId,
  }),
  [events.FIGHT]: ({ entityId }) => ({
    text: `Attack ${entityId} (A)`, //todo: ship name here
    data: entityId,
  }),
}

module.exports = ({ state }) =>
  (state.actions || []).map(item => {
    const { text, data } = menuItems[item.event](item)

    return `<button onclick="window.emit('${item.event}', '${data}')">${text}</button>`
  }).join('')
