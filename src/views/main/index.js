const Menu = require('../menu')
const World = require('../world')
const Stats = require('../stats')
const { playerEntity } = require('../../enitity')
const { GAME_NAME } = require('../../const')
const { percentOfLevel } = require('../../game')

module.exports = ({ state, config }) => {
  const { damage } = playerEntity(state.entities) || {}

  const gameOver = state.gameOver ? '<game-over>Game Over</game-over>' : ''
  const ofLevel = percentOfLevel(damage, config.damageLevels)
  const dmgBar = `<bar class="dmg" style="width:${ofLevel}%"></bar>`

  return `
    <h1>${GAME_NAME}</h1>
    
    ${gameOver}
    
    ${dmgBar}
    
    <world ${state.gameOver ? 'game-over' : ''}>${World({ state, config })}</world>
  `
}

//<aside class="stats" ${state.gameOver ? 'game-over' : ''}>
//       ${Stats({ state })}
//     </aside>

//    <aside class="actions">
//       <menu>${Menu({ state })}</menu>
//     </aside>
