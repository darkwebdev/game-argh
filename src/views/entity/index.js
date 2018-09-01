const { EGIDS } = require('../../const')

const percent = (value, max) => value > 0 ? (value * 100) / max : 0

const Bar = ({ className, valuePercent }) =>
  `<bar class="${className}" style="width: ${valuePercent}%"></bar>`

module.exports = ({ hp, maxHp, armor, maxArmor, gid, name, timeout, damage, armorUp }) => {
  const stats = hp !== undefined ? ` [ ${hp} hp + ${armor}, dmg: ${ damage } ]` : ''
  const props = armorUp ? ` [ upgrade: armor(${armorUp}) ]` : ''
  const title = name ? ` title="${name}${stats}${props}"` : ''
  const timeoutAttr = gid === EGIDS.BOMB ? ` timeout=${timeout + 1}` : ''
  const isSinking = hp <= 0
  const sinkAttr = isSinking ? ` sink` : ''

  const hpPercent = percent(hp, maxHp)
  const armorPercent = percent(armor, maxArmor)
  const hpBar = hp === undefined ? '' : Bar({ className: 'hp', valuePercent: hpPercent })
  const armorBar = armor === undefined ? '' : Bar({ className: 'armor', valuePercent: armorPercent })

  return `<e gid=${gid}${sinkAttr}${title}${timeoutAttr}>${hpBar}${armorBar}</e>`
}
