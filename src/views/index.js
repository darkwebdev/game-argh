'use strict'

this._.renderView = ((_) => {
  return ({ state, game }) => `
    <h1>${game.name}</h1>
  
    <div class="game-version">Game version: ${game.version}</div>
    <div>Location: ${state.location}</div>
    
    <h2>Vehicle</h2>
    <div>HP: ${state.hp}</div>
    <div>Armor: ${state.armor}</div>
    <div>Damage: ${state.damage}</div>
    
    <h2>Your actions</h2>
    <div class="menu">${_.renderMenu({ state })}</div>
`
})(this._)
