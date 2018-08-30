const { TGIDS, EGIDS } = require('../../const')
const { coords } = require('../../world')
const { entityAt } = require('../../enitity')
const { filter } = require('../../helpers')

const cells = {
  [TGIDS.WATER]: 'w',
  [TGIDS.LAND]: 'l'
}

const percent = (value, max) => value > 0 ? (value * 100) / max : 0

module.exports = ({ state }) => {
  const visibleEntities = filter(state.entities, e => e.visible);

  return (state.world.terrain || [])
    .map((cell, i) => {
      const el = cells[cell]
      const { x, y } = coords(i) // todo: optimize for performance???
      const { gid, name, hp, maxHp, armor, maxArmor, damage, armorUp, timeout } =
        entityAt({ entities: visibleEntities, x, y }) || {}
      const hpPercent = percent(hp, maxHp)
      const armorPercent = percent(armor, maxArmor)
      const stats = hp !== undefined ? ` [ ${hp} hp + ${armor}, dmg: ${ damage } ]` : ''
      const props = armorUp ? ` [ upgrade: armor(${armorUp}) ]` : ''
      const title = name ? ` title="${name}${stats}${props}"` : ''
      const isSinking = hp <= 0
      const isBomb = gid === EGIDS.BOMB

      const classes = [
        isSinking && 'sink',
        gid && `e-${gid}`,
      ].filter(Boolean).join(' ')
      const classAttr = classes.length ? ` class="${classes}"` : ''

      const timeoutAttr = isBomb ? ` timeout=${timeout + 1}` : ''

      const Bar = ({ className, valuePercent }) =>
        `<bar class="${className}" style="width: ${valuePercent}%"></bar>`

      const hpBar = hp !== undefined ? Bar({ className: 'hp', valuePercent: hpPercent }) : ''
      const armorBar = armor !== undefined ? Bar({ className: 'armor', valuePercent: armorPercent }) : ''

      return `<${el}${classAttr}${timeoutAttr}${title}>${hpBar}${armorBar}</${el}>`
    })
    .join('')
}
