const { TGIDS, EGIDS } = require('../../const')
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
      const { gid, name, hp, armor, damage, armorUp, timeout } =
        entityAt({ entities: visibleEntities, x, y }) || {}
      const stats = hp !== undefined ? ` [ ${hp} hp + ${armor}, dmg: ${ damage } ]` : ''
      const props = armorUp ? ` [ upgrade: armor(${armorUp}) ]` : ''
      const title = name ? ` title="${name}${stats}${props}"` : ''
      const isSinking = hp <= 0
      const isBomb = gid === EGIDS.BOMB

      const classes = [
        isSinking && 'sink',
        gid && `e-${gid}`,
        isBomb && `t-${timeout}`
      ].filter(Boolean).join(' ')

      const classAttr = classes.length ? ` class="${classes}"` : ''

      return `<${el}${classAttr}${title}></${el}>`
    })
    .join('')
}
