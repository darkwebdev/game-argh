const Menu = require('../menu')
const World = require('../world')
const { playerEntity } = require('../../entity')
const { percentOfLevel } = require('../../game')

module.exports = ({ state, config }) => {
  const { damage } = playerEntity(state.entities) || {}

  const gameOver = state.gameOver ? '<game-over>Game Over</game-over>' : ''
  const victory = state.victory ? '<victory>Victory</victory><grats>YOU\'VE SUNK THE BASTARD!</grats>' : ''

  const ofLevel = percentOfLevel(damage, config.damageLevels)
  const dmgBar = `<bar class="dmg" style="width:${ofLevel}%"></bar>`

  return `
    ${dmgBar}
    
    <world ${state.gameOver || state.victory ? 'game-over' : ''}>${World({ state, config })}</world>

    ${gameOver}
    ${victory}
    
    <menu>${state.gameOver || state.victory ? Menu({ state }) : ''}</menu>
  `
}
