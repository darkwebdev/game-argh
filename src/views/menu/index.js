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
  [events.REPAIR]: ({ entityId, entities }) => ({
    text: `Repair armor at ${entities[entityId].name} (R)`,
    data: entityId,
  }),
  [events.UPGRADE]: ({ entityId, entities }) => ({
    text: `Upgrade armor in ${entities[entityId].name} (U)`,
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

    return `<button onclick="emit('${item.event}', '${data}')">${text}</button>`
  }).join('')
