'use strict';

const Controller = require('./controller')
const { events, emit } = require('./events')
const config = require('./config')
const { world } = require('./world')

console.log('Starting game...')

window.emit = emit
Controller({ config, root: '#app', world })

emit(events.NEW_GAME)
