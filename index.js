import escape from 'escape-string-regexp'

const isNil = val => val == null

const isString = val => typeof val === 'string'

const attach = opts => (haystack, needle, attachment) => {
  const arr = [needle, attachment]
  if (isNil(haystack) || !isString(haystack)) return ''
  if (arr.some(isNil) ||
    !arr.every(isString) ||
    needle.length === 0 ||
    attachment.length === 0
  ) return haystack

  const { type, ensureAttached } = opts
  const needleEscaped = escape(needle)
  let acc = []

  return (function recur (subset) {
    let locFound = subset.search(needleEscaped)
    if (locFound === -1) {
      return acc.length ? acc.concat(subset).join('') : subset
    }

    const locStartNextSubset = locFound + needle.length
    const nextSubset = subset.slice(locStartNextSubset)
    const accumulateStrPrecedingNextSubset = () =>
      acc.concat(subset.slice(0, locStartNextSubset))

    if (type === 'prepend') {
      const locStartPotential = locFound - attachment.length
      // If needle found at 0 then look at last index in accumulator.
      const potential = locFound === 0
        ? acc[acc.length - 1]
        : subset.slice(locStartPotential, locFound)

      if (ensureAttached && potential === attachment) {
        acc = accumulateStrPrecedingNextSubset()
        return recur(nextSubset)
      }

      acc = acc
        .concat(subset.slice(0, locFound))
        .concat([attachment])
        .concat(subset.slice(locFound, locStartNextSubset))
    } else {
      const locEndPotential = locStartNextSubset + attachment.length
      const potential = subset.slice(locStartNextSubset, locEndPotential)

      if (ensureAttached && potential === attachment) {
        acc = accumulateStrPrecedingNextSubset()
        return recur(nextSubset)
      }

      acc = acc
        .concat(subset.slice(0, locStartNextSubset))
        .concat([attachment])
    }

    return recur(nextSubset)
  })(haystack)
}

export const prepend = attach({ type: 'prepend' })

export const append = attach({ type: 'append' })

export const ensurePrepended = attach({
  type: 'prepend',
  ensureAttached: true
})

export const ensureAppended = attach({
  type: 'append',
  ensureAttached: true
})
