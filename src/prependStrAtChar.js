/*
 *  const str = '$the gr()$eat gatsby $$'
 *  prependStrAtChar(str, '$', '()')   // ()$the gr()$eat gatsby ()$()$
 */
function prependStrAtChar (str, searchChar, prependStr) {
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

module.exports = {
  prependStrAtChar
}
