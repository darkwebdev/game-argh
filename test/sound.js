const { expect } = require('chai')
const jsfxr = require('../lib/jsfxr')
// const mockAudio = function () {
//   return {
//     addEventListener() {}
//   }
// }
// const { sounds } = require('../src/sound')(mockAudio)

describe('Audio', () => {
  it('should generate base64 wave', () => {
    const sound = [3,0.0003,0.0166,0.0026,0.1629,0.26,,-0.9,-0.4599,0.0642,-0.7435,-0.84,-0.171,-0.7487,-0.56,0.22,-0.6799,-0.64,0.47,-0.58,-0.211,0.19,-0.62,0.5]
    const dataUri = jsfxr(sound)
    expect(dataUri).not.to.be.undefined
    expect(dataUri).to.equal('')
  })
})
