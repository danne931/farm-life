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
  let strArr = []

  return (function _placeStrAtChar (str) {
    const locFound = str.search(escapeSpecialChars(searchChar))
    if (locFound === -1) {
      return strArr.length ? strArr.concat(str).join('') : str
    }

    const nextSubStr = str.slice(locFound + 1)
    const accStrPrecedingLocFound = () =>
      strArr.concat(str.slice(0, locFound + 1))

    if (type === 'prepend') {
      const locStartPotential = locFound - placementStrSize
      const potential = str.slice(locStartPotential, locFound)

      if (locStartPotential >= 0 && potential === placementStr) {
        strArr = accStrPrecedingLocFound()
        return strArr.length ? _placeStrAtChar(nextSubStr) : str
      }

      strArr = strArr
        .concat(str.slice(0, locFound))
        .concat([placementStr])
        .concat(str.slice(locFound, locFound + 1))
    } else {
      const locEndPotential = locFound + placementStrSize
      const potential = str.slice(locFound + 1, locEndPotential + 1)

      if (locEndPotential >= 0 && potential === placementStr) {
        strArr = accStrPrecedingLocFound()
        return strArr.length ? _placeStrAtChar(nextSubStr) : str
      }

      strArr = strArr
        .concat(str.slice(0, locFound + 1))
        .concat([placementStr])
    }

    return _placeStrAtChar(nextSubStr)
  })(str)
}

export function prependStrAtChar () {
  return placeStrAtChar('prepend')(...arguments)
}

export function appendStrAtChar () {
  return placeStrAtChar('append')(...arguments)
}
