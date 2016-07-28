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
    needle: '$',
    attachment: '()'
  },
  {
    before: 'the- g---reat $--$',
    expected: 'the**- g**-**-**-reat $**-**-$',
    needle: '-',
    attachment: '**'
  }
]

const ensureAppendItems = [
  {
    before: '$the gr()$eat gatsby $()$',
    expected: '$()the gr()$()eat gatsby $()$()',
    needle: '$',
    attachment: '()'
  },
  {
    before: 'the- g---reat $--$',
    expected: 'the-** g-**-**-**reat $-**-**$',
    needle: '-',
    attachment: '**'
  }
]

const prependItems = [
  {
    before: '$the gr()$eat gatsby $$',
    expected: '()$the gr()()$eat gatsby ()$()$',
    needle: '$',
    attachment: '()'
  }
]

const appendItems = [
  {
    before: '$the gr()$eat gatsby $()$',
    expected: '$()the gr()$()eat gatsby $()()$()',
    needle: '$',
    attachment: '()'
  }
]

ensurePrependItems.forEach(item => {
  test('ensurePrepended() should prepend attachment to needle if does not exist', t => {
    t.is(
      item.expected,
      ensurePrepended(item.before, item.needle, item.attachment)
    )
  })
})

ensureAppendItems.forEach(item => {
  test('ensureAppended() should append attachment to needle if does not exist', t => {
    t.is(
      item.expected,
      ensureAppended(item.before, item.needle, item.attachment)
    )
  })
})

prependItems.forEach(item => {
  test('prepend() should prepend attachment to needle', t => {
    t.is(
      item.expected,
      prepend(item.before, item.needle, item.attachment)
    )
  })
})

appendItems.forEach(item => {
  test('append() should append attachment to needle', t => {
    t.is(
      item.expected,
      append(item.before, item.needle, item.attachment)
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

  test(fnName + ' returns empty string if haystack is not of type string', t => {
    t.is(fn(100030, 1, '$'), '')
    t.is(fn([], 1, '$'), '')
  })

  const testTitle = fnName + ' returns haystack if haystack is non-empty ' +
    'string and needle or attachment are not of type string'
  const str = 'abc'
  test(testTitle, t => {
    t.is(fn(str, null, null), str)
    t.is(fn(str, null, '$'), str)
    t.is(fn(str, 'a', null), str)
  })

  const testTitle2 = fnName + ' returns haystack if haystack is non-empty ' +
    'string and needle or attachment are empty string'
  test(testTitle2, t => {
    t.is(fn(str, '', '$'), str)
    t.is(fn(str, 'a', ''), str)
  })
})
