'use strict';

const Controller = require('./controller')
const { events, emit } = require('./events')
const config = require('./config')
const { world } = require('./world')
const { playerEntity } = require('./enitity')
const { menu } = require('./game')

console.log('Starting game...')

window.emit = emit
Controller({ config, root: '#app' })

const entities = world.entities
const { x, y } = playerEntity(entities)
const initialState = {
  entities,
  world: {
    terrain: world.terrain,
    width: world.width
  },
  menu: menu({ state: { entities }, x, y })
}

emit(events.UPDATE_STATE, initialState)
