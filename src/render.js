'use strict'

this._.compile = (() => {
  const SPACE_RE = /[\r\t\n]/g
  const QUOTE_RE = /'/g
  const ESC_QUOTE_RE = /\\'/g
  const PROC_RE = /<#(.+?)#>/g

  const replaceProcFn = (all, g1) => {
    const s = g1.replace(ESC_QUOTE_RE, `'`)

    return s.charAt(0) === '=' ? (`'+${s.slice(1)}+'`) : (`';${s}s+='`)
  }

  return str => new Function('data={}', `with(data){let s='${
    str
      .replace(SPACE_RE, ' ')
      .replace(QUOTE_RE, `\\'`)
      .replace(PROC_RE, replaceProcFn)
    }';return s;}`)
})()

if (typeof module !== 'undefined') {
  module.exports = global
}
