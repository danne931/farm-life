import test from 'ava'
import {
  prependStrAtChar,
  appendStrAtChar,
  ensureStrPrependedAtChar,
  ensureStrAppendedAtChar
} from '../index'

const testMissingArgs = (t, fn) => {
  t.is(fn(), '')
  t.is(fn('a', null, null), '')
  t.is(fn(null, 'a', null), '')
  t.is(fn(null, null, 'a'), '')
}

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

test('prependStrAtChar returns empty string if called with missing args', t => {
  testMissingArgs(t, prependStrAtChar)
})

test('appendStrAtChar returns empty string if called with missing args', t => {
  testMissingArgs(t, appendStrAtChar)
})

test('ensureStrAppendedAtChar returns empty string if called with missing args', t => {
  testMissingArgs(t, ensureStrAppendedAtChar)
})

test('ensureStrPrependedAtChar returns empty string if called with missing args', t => {
  testMissingArgs(t, ensureStrPrependedAtChar)
})
