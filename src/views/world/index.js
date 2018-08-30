const { TGIDS } = require('../../const')
const { coords } = require('../../world')
const { entityAt } = require('../../enitity')
const { filter } = require('../../helpers')

const cells = {
  [TGIDS.WATER]: 'w',
  [TGIDS.LAND]: 'l'
}

module.exports = ({ state }) => {
  const visibleEntities = filter(state.entities, e => e.visible);

  return (state.world.terrain || [])
    .map((cell, i) => {
      const el = cells[cell]
      const { x, y } = coords(i) // todo: optimize for performance???
      const entity = entityAt({ entities: visibleEntities, x, y })
      const { name, hp, armor, damage, armorUp } = entity || {}
      const stats = hp !== undefined ? ` [ ${hp} hp + ${armor}, dmg: ${ damage } ]` : ''
      const props = armorUp ? ` [ upgrade: armor(${armorUp}) ]` : ''
      const title = name ? ` title="${name}${stats}${props}"` : ''
      const isSinking = hp <= 0

      const classes = [
        isSinking && 'sink',
        entity && `entity-${entity.gid}`
      ].filter(Boolean).join(' ')

      const classAttr = classes.length ? ` class="${classes}"` : ''

      return `<${el}${classAttr}${title}></${el}>`
    })
    .join('')
}
