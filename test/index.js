import test from 'ava'
import { prependStrAtChar, appendStrAtChar } from '../index'

const prependItems = [
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

const appendItems = [
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
  t.is(prependStrAtChar(), '')
  t.is(prependStrAtChar('a', null, null), '')
  t.is(prependStrAtChar(null, 'a', null), '')
  t.is(prependStrAtChar(null, null, 'a'), '')
})

test('appendStrAtChar returns empty string if called with missing args', t => {
  t.is(appendStrAtChar(), '')
  t.is(appendStrAtChar('a', null, null), '')
  t.is(appendStrAtChar(null, 'a', null), '')
  t.is(appendStrAtChar(null, null, 'a'), '')
})
