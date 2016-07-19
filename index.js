const escapeSpecialChars = str =>
  str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')

const someNull = arr =>
  arr.some(k => k == null)

const someNotOfTypeStrOrNum = arr =>
  arr.some(k =>
    typeof k !== 'string' && typeof k !== 'number'
  )

const insertStrAtChar = opts => (str, searchChar, insertionStr) => {
  const args = [str, searchChar, insertionStr]
  if (someNull(args) || someNotOfTypeStrOrNum(args)) return ''

  const { type, ensureInserted } = opts
  const insertionStrSize = insertionStr.length
  const searchCharEscaped = escapeSpecialChars(searchChar)
  let acc = []

  return (function _insertStrAtChar (subset) {
    const locFound = subset.search(searchCharEscaped)
    if (locFound === -1) {
      return acc.length ? acc.concat(subset).join('') : subset
    }

    const nextSubset = subset.slice(locFound + 1)
    const accStrPrecedingLocFound = () =>
      acc.concat(subset.slice(0, locFound + 1))

    if (type === 'prepend') {
      const locStartPotential = locFound - insertionStrSize
      const potential = subset.slice(locStartPotential, locFound)

      if (ensureInserted && locStartPotential >= 0 && potential === insertionStr) {
        acc = accStrPrecedingLocFound()
        return subset.length ? _insertStrAtChar(nextSubset) : subset
      }

      acc = acc
        .concat(subset.slice(0, locFound))
        .concat([insertionStr])
        .concat(subset.slice(locFound, locFound + 1))
    } else {
      const locEndPotential = locFound + insertionStrSize
      const potential = subset.slice(locFound + 1, locEndPotential + 1)

      if (ensureInserted && locEndPotential >= 0 && potential === insertionStr) {
        acc = accStrPrecedingLocFound()
        return subset.length ? _insertStrAtChar(nextSubset) : subset
      }

      acc = acc
        .concat(subset.slice(0, locFound + 1))
        .concat([insertionStr])
    }

    return _insertStrAtChar(nextSubset)
  })(str)
}

export const prependStrAtChar = insertStrAtChar({ type: 'prepend' })

export const appendStrAtChar = insertStrAtChar({ type: 'append' })

export const ensureStrPrependedAtChar = insertStrAtChar({
  type: 'prepend',
  ensureInserted: true
})

export const ensureStrAppendedAtChar = insertStrAtChar({
  type: 'append',
  ensureInserted: true
})
