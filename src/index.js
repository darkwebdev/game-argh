const Controller = require('./controller')
const { events, emit } = require('./events')
const config = require('./config')
const { world } = require('./world')
const sound = require('./sound')(window.AudioContext || window.webkitAudioContext /* for chrome <= 57 */)

console.log('Starting game...')
// sound.play(sound.sounds.sample)

window.emit = emit
Controller({ config, root: '#app', world, sound })

emit(events.NEW_GAME)
