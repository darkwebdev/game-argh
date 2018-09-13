const { range } = require('../../helpers')
const Menu = require('../menu')

module.exports = ({ state, config }) => {
  const fragmentWidth = config.flagFragmentWidthPx
  const totalFragments = config.flagFragments
  const flagWidth = fragmentWidth * totalFragments
  const scale = .25 * document.body.clientWidth / flagWidth

  const frags = range(totalFragments).map(i => {
    const style = `background-position-x: ${-i * fragmentWidth}px;` +
                  `animation-delay: ${i * 50}ms;` +
                  `width: ${fragmentWidth}px`

    return `<span style="${style}"></span>`
  }).join('')

  return `
    <intro>
      <flag style="width: ${flagWidth}px; transform: scale(${scale})">
        ${frags}
      </flag>
      
      <menu>${Menu({ state })}</menu>
          
    </intro>
  `
}
