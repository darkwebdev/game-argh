'use strict';

const Controller = require('./controller')
const { events, emit } = require('./events')
const config = require('./config')
const { world } = require('./world')

console.log('Starting game...')

window.emit = emit
Controller({ config, root: '#app' })

const entities = world.entities
const initialState = {
  entities,
  world: {
    terrain: world.terrain,
    width: world.width
  }
}

emit(events.UPDATE_STATE, initialState)
emit(events.START_TURN)
