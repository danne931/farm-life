/*
 *  const str = '$the gr()$eat gatsby $$'
 *  prependStrAtChar(str, '$', '()')   // ()$the gr()$eat gatsby ()$()$
 */

const escapeSpecialChars = str =>
  str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')

const someNull = arr =>
  arr.some(k => k == null)

const someNotOfTypeStrOrNum = arr =>
  arr.some(k =>
    typeof k !== 'string' && typeof k !== 'number'
  )

export default function prependStrAtChar (str, searchChar, prependStr) {
  const args = [str, searchChar, prependStr]
  if (someNull(args) || someNotOfTypeStrOrNum(args)) return ''
  let strArr = []

  return (function _prependStrAtChar (str) {
    const foundAt = str.search(escapeSpecialChars(searchChar))
    if (foundAt === -1) {
      return strArr.length ? strArr.concat(str).join('') : str
    }

    const nextSubStr = str.slice(foundAt + 1)
    const z = foundAt - prependStr.length
    const strPrecedingSearchChar = str.slice(z, foundAt)

    if (z >= 0 && strPrecedingSearchChar === prependStr) {
      strArr = strArr.concat(str.slice(0, foundAt + 1))
      return strArr.length ? _prependStrAtChar(nextSubStr) : str
    }

    const a = str.slice(0, foundAt)
    const b = str.slice(foundAt, foundAt + 1)
    strArr = strArr.concat(a).concat([prependStr]).concat(b)

    return _prependStrAtChar(nextSubStr)
  })(str)
}
