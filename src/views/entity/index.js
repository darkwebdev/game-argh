const { damageLevel } = require('../../game')
const { isPort } = require('../../entity')

const percent = (value, max) => value > 0 ? (value * 100) / max : 0

const Bar = ({ className, valuePercent }) => `<bar class="${className}" style="width:${valuePercent}%"></bar>`

module.exports = ({ props = {}, config = {}}) => {
  const { hp, maxHp, armor, maxArmor, gid, name, timeout, damage, armorUp, enemyId } = props

  const level = damageLevel(damage, config.damageLevels)
  const levelAttr = level === -1 ? '' : ` level=${level}`

  const enemyAttr = enemyId === undefined ? '' : ` enemy=${enemyId}`

  const stats = hp !== undefined ? ` [ ${hp} hp + ${armor}, dmg: ${ damage } ]` : ''
  const upgrades = armorUp ? ` [ upgrade: armor(${armorUp}) ]` : ''
  const title = name ? ` title="${name}${stats}${upgrades}"` : ''

  const upgradeAttr = armorUp ? ` armor-up=${armorUp}` : ''

  const timeoutAttr = timeout === undefined ? '' : ` timeout=${timeout + 1}`

  const isSinking = !isPort(props) && hp <= 0
  const sinkAttr = isSinking ? ` sink` : ''

  const hpPercent = percent(hp, maxHp)
  const armorPercent = percent(armor, maxArmor)
  const hpBar = hp === undefined ? '' : Bar({ className: 'hp', valuePercent: hpPercent })
  const armorBar = armor === undefined ? '' : Bar({ className: 'armor', valuePercent: armorPercent })

  return `<e gid=${gid}${levelAttr}${enemyAttr}${upgradeAttr}${sinkAttr}${title}${timeoutAttr}>${hpBar}${armorBar}</e>`
}
