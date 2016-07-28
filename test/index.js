import test from 'ava'
import * as libFns from '../index'

const {
  prepend,
  append,
  ensurePrepended,
  ensureAppended
} = libFns

const ensurePrependItems = [
  {
    before: '$the gr()$eat gatsby $$',
    expected: '()$the gr()$eat gatsby ()$()$',
    character: '$',
    insertionStr: '()'
  },
  {
    before: 'the- g---reat $--$',
    expected: 'the**- g**-**-**-reat $**-**-$',
    character: '-',
    insertionStr: '**'
  }
]

const ensureAppendItems = [
  {
    before: '$the gr()$eat gatsby $()$',
    expected: '$()the gr()$()eat gatsby $()$()',
    character: '$',
    insertionStr: '()'
  },
  {
    before: 'the- g---reat $--$',
    expected: 'the-** g-**-**-**reat $-**-**$',
    character: '-',
    insertionStr: '**'
  }
]

const prependItems = [
  {
    before: '$the gr()$eat gatsby $$',
    expected: '()$the gr()()$eat gatsby ()$()$',
    character: '$',
    insertionStr: '()'
  }
]

const appendItems = [
  {
    before: '$the gr()$eat gatsby $()$',
    expected: '$()the gr()$()eat gatsby $()()$()',
    character: '$',
    insertionStr: '()'
  }
]

ensurePrependItems.forEach(item => {
  test('ensurePrepended() should prepend string at a given char if does not exist', t => {
    t.is(
      item.expected,
      ensurePrepended(item.before, item.character, item.insertionStr)
    )
  })
})

ensureAppendItems.forEach(item => {
  test('ensureAppended() should append string at a given char if does not exist', t => {
    t.is(
      item.expected,
      ensureAppended(item.before, item.character, item.insertionStr)
    )
  })
})

prependItems.forEach(item => {
  test('prepend() should prepend string at a given char', t => {
    t.is(
      item.expected,
      prepend(item.before, item.character, item.insertionStr)
    )
  })
})

appendItems.forEach(item => {
  test('append() should append string at a given char', t => {
    t.is(
      item.expected,
      append(item.before, item.character, item.insertionStr)
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

  test(fnName + ' return empty string if str arg is not of type string', t => {
    t.is(fn(100030, 1, '$'), '')
    t.is(fn([], 1, '$'), '')
  })

  const testTitle = fnName + ' returns str arg if str arg is non-empty ' +
    'string and searchChar or insertionStr args are not of type ' +
    'string'
  const str = 'abc'
  test(testTitle, t => {
    t.is(fn(str, null, null), str)
    t.is(fn(str, null, '$'), str)
    t.is(fn(str, 'a', null), str)
  })

  const testTitle2 = fnName + ' returns str arg if str arg is non-empty ' +
    'string and searchChar or insertionStr args are empty string'
  test(testTitle2, t => {
    t.is(fn(str, '', '$'), str)
    t.is(fn(str, 'a', ''), str)
  })
})
