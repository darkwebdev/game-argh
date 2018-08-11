'use strict'

this._.renderMenu = (({ events }) => {
  const menuStrings = {
    [events.SAIL]: 'Sail to open sea',
    [events.SHOP]: 'Buy, sell, upgrade'
  }

  return ({ state }) =>
    (state.menu || []).map(event =>
      `<button class="menu-${event}">${menuStrings[event]}</button>`
    ).join('')
})(this._.events)
