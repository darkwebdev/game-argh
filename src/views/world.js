'use strict'

const { terrains } = require('../const')
const { coords } = require('../world')
const { entityAt } = require('../enitity')
const { filter } = require('../helpers')

const cells = {
  [terrains.gids.WATER]: 'w',
  [terrains.gids.LAND]: 'l'
}

module.exports = ({ state }) => {
  const visibleEntities = filter(state.entities, e => e.visible);
  console.log('visible entities', visibleEntities)

  return (state.world.terrain || [])
    .map((cell, i) => {
      const el = cells[cell]
      const { x, y } = coords(i) // todo: optimize for performance
      const entity = entityAt({ entities: visibleEntities, x, y })
      const { hp, armor, damage } = (entity || {}).properties || {}
      const title = hp !== undefined ? ` title="${hp} hp + ${armor}, dmg: ${ damage }"` : ''

      const classes = [
        hp <= 0 && 'sink',
        entity && `entity-${entity.gid}`
      ].filter(Boolean).join(' ')

      const classAttr = classes.length ? ` class="${classes}"` : ''

      return `<${el}${classAttr}${title}></${el}>`
    })
    .join('')
}
