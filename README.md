# insert-string-at-char

Prepend or append string X to each occurrence of string Y in string Z

[![Build Status](https://travis-ci.org/danne931/insert-string-at-char.svg?branch=master)](https://travis-ci.org/danne931/insert-string-at-char)
[![npm version](https://img.shields.io/npm/v/insert-string-at-char.svg?style=flat-square)](https://www.npmjs.com/package/insert-string-at-char)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
![](https://img.shields.io/badge/license-MIT-blue.svg)

## Install

```
$ npm install --save insert-string-at-char
```

Not using Node or a module bundler? Use a UMD build via the `<script>` tag.
- [https://npmcdn.com/insert-string-at-char/dist/insert-string-at-char.js](https://npmcdn.com/insert-string-at-char/dist/insert-string-at-char.js)
- [https://npmcdn.com/insert-string-at-char/dist/insert-string-at-char.min.js](https://npmcdn.com/insert-string-at-char/dist/insert-string-at-char.min.js)

## Usage

```javascript
import {
  append,
  prepend,
  ensureAppended,
  ensurePrepended
} from 'insert-string-at-char'

const haystack = '$the gr[]$[]eat gatsby $$[]'
const needle = '$'
const attachment = '[]'

append(haystack, needle, attachment)  // '$[]the gr[]$[][]eat gatsby $[]$[][]'
ensureAppended(haystack, needle, attachment) // '$[]the gr[]$[]eat gatsby $[]$[]'

prepend(haystack, needle, attachment)  // '[]$the gr[][]$[]eat gatsby []$[]$[]'
ensurePrepended(haystack, needle, attachment)  // '[]$the gr[]$[]eat gatsby []$[]$[]'
```
