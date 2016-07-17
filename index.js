const escapeSpecialChars = str =>
  str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')

const someNull = arr =>
  arr.some(k => k == null)

const someNotOfTypeStrOrNum = arr =>
  arr.some(k =>
    typeof k !== 'string' && typeof k !== 'number'
  )

const placeStrAtChar = opts => (str, searchChar, placementStr) => {
  const args = [str, searchChar, placementStr]
  if (someNull(args) || someNotOfTypeStrOrNum(args)) return ''

  const { type, ensurePlacement } = opts
  const placementStrSize = placementStr.length
  let acc = []

  return (function _placeStrAtChar (subset) {
    const locFound = subset.search(escapeSpecialChars(searchChar))
    if (locFound === -1) {
      return acc.length ? acc.concat(subset).join('') : subset
    }

    const nextSubset = subset.slice(locFound + 1)
    const accStrPrecedingLocFound = () =>
      acc.concat(subset.slice(0, locFound + 1))

    if (type === 'prepend') {
      const locStartPotential = locFound - placementStrSize
      const potential = subset.slice(locStartPotential, locFound)

      if (ensurePlacement && locStartPotential >= 0 && potential === placementStr) {
        acc = accStrPrecedingLocFound()
        return subset.length ? _placeStrAtChar(nextSubset) : subset
      }

      acc = acc
        .concat(subset.slice(0, locFound))
        .concat([placementStr])
        .concat(subset.slice(locFound, locFound + 1))
    } else {
      const locEndPotential = locFound + placementStrSize
      const potential = subset.slice(locFound + 1, locEndPotential + 1)

      if (ensurePlacement && locEndPotential >= 0 && potential === placementStr) {
        acc = accStrPrecedingLocFound()
        return subset.length ? _placeStrAtChar(nextSubset) : subset
      }

      acc = acc
        .concat(subset.slice(0, locFound + 1))
        .concat([placementStr])
    }

    return _placeStrAtChar(nextSubset)
  })(str)
}

export const prependStrAtChar = placeStrAtChar({ type: 'prepend' })

export const appendStrAtChar = placeStrAtChar({ type: 'append' })

export const ensureStrPrependedAtChar = placeStrAtChar({
  type: 'prepend',
  ensurePlacement: true
})

export const ensureStrAppendedAtChar = placeStrAtChar({
  type: 'append',
  ensurePlacement: true
})
