const World = require('../world')
const { playerEntity } = require('../../entity')
const { GAME_NAME } = require('../../const')
const { percentOfLevel } = require('../../game')

module.exports = ({ state, config }) => {
  const { damage } = playerEntity(state.entities) || {}

  const gameOver = state.gameOver ? '<game-over>Game Over</game-over>' : ''
  const victory = state.victory ? '<victory>Victory</victory>' : ''
  const ofLevel = percentOfLevel(damage, config.damageLevels)
  const dmgBar = `<bar class="dmg" style="width:${ofLevel}%"></bar>`

  return `
    <h1>${GAME_NAME}</h1>
    
    ${gameOver}
    ${victory}
    
    ${dmgBar}
    
    <world ${state.gameOver || state.victory ? 'game-over' : ''}>${World({ state, config })}</world>
  `
}
