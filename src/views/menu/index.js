const { EVENTS } = require('../../events')
const { GAME_NAME } = require('../../const')

const menuItems = {
  [EVENTS.NEW_GAME]: () => ({
    text: `New game (N)`,
  }),
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
