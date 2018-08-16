'use strict'

const Menu = require('./menu')
const World = require('./world')
const Stats = require('./stats')
const locations = require('../locations')
const { playerEntity } = require('../enitity')
const { gameName } = require('../const')

module.exports = ({ state, config }) => {
  const { x, y } = playerEntity(state.entities)
  const location = locations.find(l => l.x === x && l.y === y) || locations[0]

  return `
    <h1>${gameName}</h1>
    <div class="game-version">version: ${config.version}</div>
    
    <aside class="location">
      <h2>Location: ${location.name}</h2>
      <p>coords: [${x}, ${y}]</p>
      <p>${location.description}</p>
    </aside>
    
    <aside class="actions">
      <h2>Your actions</h2>
      <div class="menu">${Menu({ state })}</div>
    </aside>
    
    <aside class="stats">
      ${Stats({ state })}
    </aside>
  
    <div class="world">${World({ state })}</div>
  `
}
