'use strict';

const Controller = require('./controller')
const game = require('./game')
const locations = require('./locations')
const { events, emit } = require('./events')

console.log('Starting game...');
window.emit = emit
Controller(game)

const initialState = {
  hp: 100,
  armor: 100,
  damage: 100,
  location: locations.HOME_PORT,
  world: game.world(),
  menu: [
    events.SAIL,
    events.SHOP
  ]
}

emit(events.UPDATE_STATE, initialState)
