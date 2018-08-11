'use strict'

this._.render = ((_) => {
  // const template = document.getElementById('main-template')
  // const renderFn = template && _.compile(template)

  const renderFn = ({ state, game }) => `
  <h1>Pirates</h1>

  Game version: ${game.version}
`;

  return ({ root, ...input }) => {
    document.querySelector(root || 'app').innerHTML = renderFn(input)
  }
})(this._)
