'use strict'

const Controller = require('./controller')
const { EVENTS, emit } = require('./events')
const config = require('./config')

const templates = {
  // player
  'tp.json': require('../build/map/tp.js'),
  // boss
  'tb.json': require('../build/map/tb.js'),
  // allied ports
  'tap0.json': require('../build/map/tap0.js'),
  'tap1.json': require('../build/map/tap1.js'),
  'tap2.json': require('../build/map/tap2.js'),
  // enemy ports
  'tep0.json': require('../build/map/tep0.js'),
  'tep1.json': require('../build/map/tep1.js'),
  'tep2.json': require('../build/map/tep2.js'),
  // allies
  'ta0.json': require('../build/map/ta0.js'),
  'ta1.json': require('../build/map/ta1.js'),
  'ta2.json': require('../build/map/ta2.js'),
  // enemies
  'te0.json': require('../build/map/te0.js'),
  'te1.json': require('../build/map/te1.js'),
  'te2.json': require('../build/map/te2.js'),
}
const map = require('../map/map')
const { world } = require('./world')

const sound = require('./sound')(window.AudioContext || window.webkitAudioContext /* for chrome <= 57 */)

console.log('Starting game...')

window.emit = emit

Controller({
  config,
  root: '#app',
  world: world({ templates, map }),
  sound
})

emit(EVENTS.INTRO)
