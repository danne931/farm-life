import test from 'ava'
import prependStrAtChar from '../index'

const items = [
  {
    before: '$the gr()$eat gatsby $$',
    expected: '()$the gr()$eat gatsby ()$()$',
    character: '$',
    prependStr: '()'
  },
  {
    before: 'the- g---reat $--$',
    expected: 'the**- g**-**-**-reat $**-**-$',
    character: '-',
    prependStr: '**'
  }
]

items.forEach(item => {
  test('prependStrAtChar() should prepend string at a given char', t => {
    t.is(item.expected, prependStrAtChar(item.before, item.character, item.prependStr))
  })
})

test('return empty string if called with missing args', t => {
  t.is(prependStrAtChar(), '')
  t.is(prependStrAtChar('a', null, null), '')
  t.is(prependStrAtChar(null, 'a', null), '')
  t.is(prependStrAtChar(null, null, 'a'), '')
})
