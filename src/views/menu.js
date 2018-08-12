'use strict'

const { events } = require('../events')

const menuStrings = {
  [events.SAIL]: 'Sail to open sea',
  [events.SHOP]: 'Buy, sell, upgrade'
}

module.exports = ({ state }) =>
  (state.menu || []).map(event =>
    `<button onclick="window.emit('${event}')">${menuStrings[event]}</button>`
  ).join('')
