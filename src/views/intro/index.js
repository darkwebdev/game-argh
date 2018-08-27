const { range } = require('../../helpers')
const { gameName } = require('../../const')
const Menu = require('../menu')

module.exports = ({ state, config }) => {
  const logoWidthFrags = 8
  const fragWidth = config.flagFragmentWidthPx
  const totalFrags = config.flagFragments
  const sideOffset = ((totalFrags - logoWidthFrags) / 2) * fragWidth
  const scale = document.body.clientWidth / (fragWidth * totalFrags)

  const frags = range(totalFrags).map(i => {
    const style = `background-position-x: ${-i * fragWidth + sideOffset}px;` +
                  `animation-delay: ${i * 50}ms;` +
                  `width: ${fragWidth}px`

    return `<span style="${style}"></span>`
  }).join('')

  return `
    <intro>
      <flag style="transform: scale(${scale})">
        ${frags}
      </flag>
      
      <h1>${gameName}</h1>
      
      <menu>${Menu({ state })}</menu>    
      
      <div class="debug">version: ${config.version}</div>
    </intro>
  `
}
