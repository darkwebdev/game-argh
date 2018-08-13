'use strict';

const Controller = require('./controller')
const game = require('./game')
const locations = require('./locations')
const { events, emit } = require('./events')
const config = require('./config')
const { world } = require('./world')
const { player, allies, enemies, asObject } = require('./enitity')

console.log('Starting game...')

window.emit = emit
Controller({ game, config })

const initialState = {
  entities: asObject(world.entities),
  world: {
    terrain: world.terrain,
    width: world.width
  },
  menu: [
    events.SAIL,
    events.SHOP
  ]
}

emit(events.UPDATE_STATE, initialState)
