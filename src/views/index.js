'use strict'

const renderMenu = require('./menu')
const renderWorld = require('./world')
const locations = require('../locations')
const { player } = require('../enitity')

module.exports = ({ state, config }) => {
  const { x, y, properties } = player(state.entities)
  const location = locations.find(l => l.x === x && l.y === y) || locations[0]

  return `
    <h1>${config.name}</h1>
    <div class="game-version">version: ${config.version}</div>
    
    <aside class="location">
      <h2>Location: ${location.name}</h2>
      <p>coords: [${x}, ${y}]</p>
      <p>${location.description}</p>
    </aside>
    
    <aside class="actions">
      <h2>Your actions</h2>
      <div class="menu">${renderMenu({ state })}</div>
    </aside>
    
    <aside class="stats">
      <h2>Your ship</h2>
      <div>HP: ${properties.hp}</div>
      <div>Armor: ${properties.armor}</div>
      <div>Damage: ${properties.damage}</div>
    </aside>
  
    <div class="world">${renderWorld({ state })}</div>
  `
}
