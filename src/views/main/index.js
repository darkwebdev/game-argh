const Menu = require('../menu')
const World = require('../world')
const Stats = require('../stats')
const { playerEntity } = require('../../enitity')
const { GAME_NAME } = require('../../const')

module.exports = ({ state, config }) => {
  const { x, y } = playerEntity(state.entities) || {}

  const gameOver = state.gameOver ? '<game-over>Game Over</game-over>' : ''

  return `
    <h1>${GAME_NAME}</h1>
    
    ${gameOver}
    
    <aside class="actions">
      <menu>${Menu({ state })}</menu>
    </aside>
    
    <aside class="stats" ${state.gameOver ? 'game-over' : ''}>
      ${Stats({ state })}
    </aside>
  
    <world ${state.gameOver ? 'game-over' : ''}>${World({ state })}</world>
    
    <debug>version: ${config.version}, coords: [${x}, ${y}]</debug>
  `
}
