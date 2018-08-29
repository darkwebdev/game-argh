const { events } = require('../../events')
const { directions } = require('../../const')

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
  [events.REPAIR]: ({ portId, entities }) => ({
    text: `Repair armor at ${entities[portId].name} (R)`,
    data: portId,
  }),
  [events.UPGRADE]: ({ portId, entities }) => ({
    text: `Upgrade armor in ${entities[portId].name} (U)`,
    data: portId,
  }),
  [events.TRADE]: ({ entityId, entities }) => ({
    text: `Trade with ${entities[entityId].name} (T)`,
    data: entityId,
  }),
  [events.FIGHT]: ({ entityId, entities }) => ({
    text: `Attack ${entities[entityId].name} (A)`,
    data: entityId,
  }),
  [events.BOMB]: ({ x, y }) => ({
    text: `Drop time bomb (B)`,
    data: { x, y },
  }),
}

module.exports = ({ state }) =>
  (state.actions || []).map(item => {
    const { text, data = '' } = menuItems[item.event]({ ...item, entities: state.entities })
    const dataStr = typeof data === 'object' ? JSON.stringify(data) : `"${data}"`

    return `<button onclick='emit("${item.event}", ${dataStr})'>${text}</button>`
  }).join('')
