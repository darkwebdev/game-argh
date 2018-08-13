'use strict';

const Controller = require('./controller')
const game = require('./game')
const { events, emit } = require('./events')
const config = require('./config')
const { world } = require('./world')

console.log('Starting game...')

window.emit = emit
Controller({ game, config })

const initialState = {
  entities: world.entities,
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
