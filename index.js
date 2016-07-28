import escape from 'regexp.escape'

const isNil = val => val == null

const isString = val => typeof val === 'string'

const insert = opts => (str, searchStr, insertionStr) => {
  const arr = [searchStr, insertionStr]
  if (isNil(str) || !isString(str)) return ''
  if (arr.some(isNil) ||
    !arr.every(isString) ||
    searchStr.length === 0 ||
    insertionStr.length === 0
  ) return str

  const { type, ensureInserted } = opts
  const insertionStrSize = insertionStr.length
  const searchStrSize = searchStr.length
  const searchStrEscaped = escape(searchStr)
  let acc = []

  return (function recur (subset) {
    let locFound = subset.search(searchStrEscaped)
    if (locFound === -1) {
      return acc.length ? acc.concat(subset).join('') : subset
    }

    const locStartNextSubset = locFound + searchStrSize
    const nextSubset = subset.slice(locStartNextSubset)
    const accStrPrecedingNextSubset = () =>
      acc.concat(subset.slice(0, locStartNextSubset))

    if (type === 'prepend') {
      const locStartPotential = locFound - insertionStrSize
      const potential = subset.slice(locStartPotential, locFound)

      if (ensureInserted && locStartPotential >= 0 && potential === insertionStr) {
        acc = accStrPrecedingNextSubset()
        return recur(nextSubset)
      }

      acc = acc
        .concat(subset.slice(0, locFound))
        .concat([insertionStr])
        .concat(subset.slice(locFound, locStartNextSubset))
    } else {
      const locEndPotential = locStartNextSubset + insertionStrSize
      const potential = subset.slice(locStartNextSubset, locEndPotential)

      if (ensureInserted && locEndPotential >= 0 && potential === insertionStr) {
        acc = accStrPrecedingNextSubset()
        return recur(nextSubset)
      }

      acc = acc
        .concat(subset.slice(0, locStartNextSubset))
        .concat([insertionStr])
    }

    return recur(nextSubset)
  })(str)
}

export const prepend = insert({ type: 'prepend' })

export const append = insert({ type: 'append' })

export const ensurePrepended = insert({
  type: 'prepend',
  ensureInserted: true
})

export const ensureAppended = insert({
  type: 'append',
  ensureInserted: true
})
