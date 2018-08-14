'use strict'

const { events } = require('../events')

const menuStrings = {
  [events.SAIL]: 'Sail to open sea',
  [events.SHOP]: 'Buy, sell, upgrade',
  [events.TRADE]: 'Trade with ally ship',
  [events.FIGHT]: 'Attack an enemy ship'
}

module.exports = ({ state }) =>
  (state.menu || []).map(item =>
    `<button onclick="window.emit('${item.event}', ${item.entityId})">${menuStrings[item.event]}</button>`
  ).join('')
