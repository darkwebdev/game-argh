const Menu = require('./menu')
const World = require('./world')
const Stats = require('./stats')
const { playerEntity } = require('../enitity')
const { gameName } = require('../const')

module.exports = ({ state, config }) => {
  const { x, y } = playerEntity(state.entities) || {}
  const headingText = state.gameOver ? 'Game Over' : gameName
  const headingClasses = state.gameOver ? ' class="danger"' : ''

  return `
    <h1${headingClasses}>${headingText}</h1>
    
    <aside class="actions">
      <div class="menu">${Menu({ state })}</div>
    </aside>
    
    <aside class="stats">
      ${Stats({ state })}
    </aside>
  
    <div class="world">${World({ state })}</div>
    
    <div class="debug">version: ${config.version}, coords: [${x}, ${y}]</div>
  `
}
