const escapeSpecialChars = str =>
  str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')

const someNull = arr =>
  arr.some(k => k == null)

const someNotOfTypeStrOrNum = arr =>
  arr.some(k =>
    typeof k !== 'string' && typeof k !== 'number'
  )

const placeStrAtChar = type => (str, searchChar, placementStr) => {
  const args = [str, searchChar, placementStr]
  if (someNull(args) || someNotOfTypeStrOrNum(args)) return ''
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

      if (locStartPotential >= 0 && potential === placementStr) {
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

      if (locEndPotential >= 0 && potential === placementStr) {
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

export function prependStrAtChar () {
  return placeStrAtChar('prepend')(...arguments)
}

export function appendStrAtChar () {
  return placeStrAtChar('append')(...arguments)
}
