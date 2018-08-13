'use strict'

const renderMenu = require('./menu')
const renderWorld = require('./world')

module.exports = ({ state, config }) => `
  <h1>${config.name}</h1>
  <div class="game-version">version: ${config.version}</div>
  
  <aside class="location">
    <h2>Location: ${state.location.name}</h2>
    <p>${state.location.description}</p>
  </aside>
  
  <aside class="actions">
    <h2>Your actions</h2>
    <div class="menu">${renderMenu({ state })}</div>
  </aside>
  
  <aside class="stats">
    <h2>Your ship</h2>
    <div>HP: ${state.hp}</div>
    <div>Armor: ${state.armor}</div>
    <div>Damage: ${state.damage}</div>
  </aside>

  <div class="world">${renderWorld({ state })}</div>
`
