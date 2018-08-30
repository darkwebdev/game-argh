'use strict'

const Controller = require('./controller')
const { EVENTS, emit } = require('./events')
const config = require('./config')
const { world } = require('./world')
const sound = require('./sound')(window.AudioContext || window.webkitAudioContext /* for chrome <= 57 */)

console.log('Starting game...')

window.emit = emit
Controller({ config, root: '#app', world, sound })

emit(EVENTS.INTRO)
