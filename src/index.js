'use strict';

const Controller = require('./controller')
const game = require('./game')
const locations = require('./locations')
const { events, emit } = require('./events')
const config = require('./config')

console.log('Starting game...');
window.emit = emit
Controller({ game, config })

const world = game.world();
const initialState = {
  hp: 100,
  armor: 100,
  damage: 100,
  location: locations.HOME_PORT,
  world: world.terrain,
  entities: world.entities,
  menu: [
    events.SAIL,
    events.SHOP
  ]
}

emit(events.UPDATE_STATE, initialState)
