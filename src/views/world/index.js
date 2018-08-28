const { terrains } = require('../../const')
const { coords } = require('../../world')
const { entityAt } = require('../../enitity')
const { filter } = require('../../helpers')
const { events } = require('../../events')

const cells = {
  [terrains.gids.WATER]: 'w',
  [terrains.gids.LAND]: 'l'
}

module.exports = ({ state }) => {
  const visibleEntities = filter(state.entities, e => e.visible);

  return (state.world.terrain || [])
    .map((cell, i) => {
      const el = cells[cell]
      const { x, y } = coords(i) // todo: optimize for performance???
      const entity = entityAt({ entities: visibleEntities, x, y })
      const { name, hp, armor, damage } = entity || {}
      const stats = hp !== undefined ? ` [ ${hp} hp + ${armor}, dmg: ${ damage } ]` : ''
      const title = name ? ` title="${name}${stats}"` : ''
      const isSinking = hp <= 0

      const classes = [
        isSinking && 'sink',
        entity && `entity-${entity.gid}`
      ].filter(Boolean).join(' ')

      const classAttr = classes.length ? ` class="${classes}"` : ''
      const eventHandlers = [].join('')

      return `<${el}${classAttr}${title}${eventHandlers}></${el}>`
    })
    .join('')
}