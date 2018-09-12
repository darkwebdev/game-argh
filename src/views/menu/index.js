const { EVENTS } = require('../../events')
// const { DIRECTIONS } = require('../../const')
const { GAME_NAME } = require('../../const')

// const arrows = {
//   [DIRECTIONS.NORTH]: '^', // todo: sprite imgs here
//   [DIRECTIONS.EAST]: '>',
//   [DIRECTIONS.SOUTH]: 'V',
//   [DIRECTIONS.WEST]: '<',
// }
const menuItems = {
  [EVENTS.NEW_GAME]: () => ({
    text: `New game (N)`,
  }),
  // [EVENTS.SAIL]: ({ direction }) => ({
  //   text: `Sail ${direction} (${arrows[direction]})`,
  //   data: direction,
  // }),
  // [EVENTS.REPAIR]: ({ portId, entities }) => ({
  //   text: `Repair armor at ${entities[portId].name} (R)`,
  //   data: portId,
  // }),
  // [EVENTS.UPGRADE]: ({ portId, entities }) => ({
  //   text: `Upgrade armor in ${entities[portId].name} (U)`,
  //   data: portId,
  // }),
  // [EVENTS.TRADE]: ({ entityId, entities }) => ({
  //   text: `Trade with ${entities[entityId].name} (T)`,
  //   data: entityId,
  // }),
  // [EVENTS.FIGHT]: ({ entityId, entities }) => ({
  //   text: `Attack ${entities[entityId].name} (A)`,
  //   data: entityId,
  // }),
  // [EVENTS.BOMB]: ({ x, y }) => ({
  //   text: `Drop time bomb (B)`,
  //   data: { x, y },
  // }),
}

module.exports = ({ state }) => {
  const buttons = (state.actions || []).filter(a => menuItems[a.event]).map(a => {
    // console.log("MENU", a.event, menuItems[a.event])
    const { text, data = '' } = menuItems[a.event]({ ...a, entities: state.entities })
    const dataStr = typeof data === 'object' ? JSON.stringify(data) : `"${data}"`

    return `<button onclick='emit("${a.event.toString()}", ${dataStr})'>${text}</button>`
  })

  return `
    ${buttons.join('')}
    <h1>${GAME_NAME}</h1>
`
}
