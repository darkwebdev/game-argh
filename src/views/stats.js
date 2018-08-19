'use strict'

const { playerEntity } = require('../enitity')

module.exports = ({ state }) => {
  const player = playerEntity(state.entities)
  const enemy = state.enemyId && state.entities[state.enemyId]

  return `
        ${stats(player)}
        <br/>
        ${enemy ? stats({ title: 'Enemy', ...enemy }) : ''}
    `
};

function stats({ title = 'Ship', hp, maxHp, armor, maxArmor, damage }) {
  const hpClass = colorClass(hp, maxHp)
  const armorClass = colorClass(armor, maxArmor)

  return `
      <h2>${title}</h2>
      <div>HP: <span class="${hpClass}">${hp}</span>/${maxHp}</div>
      <div>Armor: <span class="${armorClass}">${armor}</span>/${maxArmor}</div>
      <div>Damage: ${damage}</div>
    `
}

function colorClass(value, maxvalue){
  const factor = maxvalue/value;

  if (factor < 2) return ''

  return factor >= 5 ? 'danger' : 'warning'
}
