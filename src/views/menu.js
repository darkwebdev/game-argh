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
  [events.SHOP]: ({ entityId, entities }) => ({
    text: `Buy, sell, upgrade at ${entities[entityId].name} (B)`,
    data: entityId,
  }),
  [events.TRADE]: ({ entityId, entities }) => ({
    text: `Trade with ${entities[entityId].name} (T)`,
    data: entityId,
  }),
  [events.FIGHT]: ({ entityId, entities }) => ({
    text: `Attack ${entities[entityId].name} (A)`,
    data: entityId,
  }),
}

module.exports = ({ state }) =>
  (state.actions || []).map(item => {
    const { text, data = '' } = menuItems[item.event]({ ...item, entities: state.entities })

    return `<button onclick="window.emit('${item.event}', '${data}')">${text}</button>`
  }).join('')
