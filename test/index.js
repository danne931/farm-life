import test from 'ava'
import * as libFns from '../index'

const {
  prependStrAtChar,
  appendStrAtChar,
  ensureStrPrependedAtChar,
  ensureStrAppendedAtChar
} = libFns

const ensurePrependItems = [
  {
    before: '$the gr()$eat gatsby $$',
    expected: '()$the gr()$eat gatsby ()$()$',
    character: '$',
    placementStr: '()'
  },
  {
    before: 'the- g---reat $--$',
    expected: 'the**- g**-**-**-reat $**-**-$',
    character: '-',
    placementStr: '**'
  }
]

const ensureAppendItems = [
  {
    before: '$the gr()$eat gatsby $()$',
    expected: '$()the gr()$()eat gatsby $()$()',
    character: '$',
    placementStr: '()'
  },
  {
    before: 'the- g---reat $--$',
    expected: 'the-** g-**-**-**reat $-**-**$',
    character: '-',
    placementStr: '**'
  }
]

const prependItems = [
  {
    before: '$the gr()$eat gatsby $$',
    expected: '()$the gr()()$eat gatsby ()$()$',
    character: '$',
    placementStr: '()'
  }
]

const appendItems = [
  {
    before: '$the gr()$eat gatsby $()$',
    expected: '$()the gr()$()eat gatsby $()()$()',
    character: '$',
    placementStr: '()'
  }
]

ensurePrependItems.forEach(item => {
  test('ensureStrPrependedAtChar() should prepend string at a given char if does not exist', t => {
    t.is(
      item.expected,
      ensureStrPrependedAtChar(item.before, item.character, item.placementStr)
    )
  })
})

ensureAppendItems.forEach(item => {
  test('ensureStrAppendedAtChar() should append string at a given char if does not exist', t => {
    t.is(
      item.expected,
      ensureStrAppendedAtChar(item.before, item.character, item.placementStr)
    )
  })
})

prependItems.forEach(item => {
  test('prependStrAtChar() should prepend string at a given char', t => {
    t.is(
      item.expected,
      prependStrAtChar(item.before, item.character, item.placementStr)
    )
  })
})

appendItems.forEach(item => {
  test('appendStrAtChar() should append string at a given char', t => {
    t.is(
      item.expected,
      appendStrAtChar(item.before, item.character, item.placementStr)
    )
  })
})

Object.keys(libFns).forEach(fnName => {
  const fn = libFns[fnName]

  test(fnName + ' returns empty string if called with missing args', t => {
    t.is(fn(), '')
    t.is(fn(null, 'a', null), '')
    t.is(fn(null, null, 'a'), '')
  })

  const testTitle = fnName + ' returns str arg if str arg is non-empty ' +
    'string but searchChar or insertionStr args are not of type ' +
    'string or number'
  const str = 'abc'

  test(testTitle, t => {
    t.is(fn(str, null, null), str)
    t.is(fn(str, null, '$'), str)
    t.is(fn(str, '$', null), str)
  })
})
