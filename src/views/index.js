'use strict'

const renderMenu = require('./menu')
const renderWorld = require('./world')

module.exports = ({ state, game }) => `
  <h1>${game.name}</h1>

  <div class="game-version">Game version: ${game.version}</div>
  <div>Location: ${state.location.name}</div>
  <p>${state.location.description}</p>
  
  <h2>Vehicle</h2>
  <div>HP: ${state.hp}</div>
  <div>Armor: ${state.armor}</div>
  <div>Damage: ${state.damage}</div>
  
  <h2>Your actions</h2>
  <div class="menu">${renderMenu({ state })}</div>
  
  <h2>World</h2>
  <div class="world">${renderWorld({ state })}</div>
`
