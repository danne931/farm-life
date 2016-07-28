import escape from 'regexp.escape'

const isNil = val => val == null

const isString = val => typeof val === 'string'

const insert = opts => (haystack, needle, attachment) => {
  const arr = [needle, attachment]
  if (isNil(haystack) || !isString(haystack)) return ''
  if (arr.some(isNil) ||
    !arr.every(isString) ||
    needle.length === 0 ||
    attachment.length === 0
  ) return haystack

  const { type, ensureInserted } = opts
  const needleEscaped = escape(needle)
  let acc = []

  return (function recur (subset) {
    let locFound = subset.search(needleEscaped)
    if (locFound === -1) {
      return acc.length ? acc.concat(subset).join('') : subset
    }

    const locStartNextSubset = locFound + needle.length
    const nextSubset = subset.slice(locStartNextSubset)
    const accStrPrecedingNextSubset = () =>
      acc.concat(subset.slice(0, locStartNextSubset))

    if (type === 'prepend') {
      const locStartPotential = locFound - attachment.length
      const potential = subset.slice(locStartPotential, locFound)

      if (ensureInserted && locStartPotential >= 0 && potential === attachment) {
        acc = accStrPrecedingNextSubset()
        return recur(nextSubset)
      }

      acc = acc
        .concat(subset.slice(0, locFound))
        .concat([attachment])
        .concat(subset.slice(locFound, locStartNextSubset))
    } else {
      const locEndPotential = locStartNextSubset + attachment.length
      const potential = subset.slice(locStartNextSubset, locEndPotential)

      if (ensureInserted && locEndPotential >= 0 && potential === attachment) {
        acc = accStrPrecedingNextSubset()
        return recur(nextSubset)
      }

      acc = acc
        .concat(subset.slice(0, locStartNextSubset))
        .concat([attachment])
    }

    return recur(nextSubset)
  })(haystack)
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
