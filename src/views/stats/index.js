const { playerEntity } = require('../../entity')

const stats = ({ title = 'Ship', hp, maxHp, armor, maxArmor, damage }) => {
  const hpClass = colorClass(hp, maxHp)
  const armorClass = colorClass(armor, maxArmor)
  const hpPercent = (hp/maxHp)*100
  const armorPercent = (armor/maxArmor)*100

  return `
      <h2>${title}</h2>
      
      <div>
        HP
        <div class="stats-bar ${hpClass}">
          <span style="left:${hpPercent}%">&nbsp;${hp}/${maxHp}</span>
        </div>
      </div>
      
      <div>
        Armor
        <div class="stats-bar ${armorClass}">
          <span style="left:${armorPercent}%">&nbsp;${armor}/${maxArmor}</span>
        </div>
      </div>
      
      <div>Damage: ${damage}</div>
    `
}

const colorClass = (value, maxvalue) => {
  const factor = maxvalue/value;

  if (factor < 2) return ''

  return factor >= 5 ? 'danger' : 'warning'
}

module.exports = ({ state }) => {
  const player = playerEntity(state.entities)
  const enemy = state.enemyId && state.entities[state.enemyId]

  return `
        ${stats(player)}
        <br/>
        ${enemy ? stats({ title: 'Enemy', ...enemy }) : ''}
    `
};
