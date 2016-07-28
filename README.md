# farm-life

Prepend/append string X (or ensure string X is prepended/appended) to each occurrence of string Y in string Z

![](http://i.giphy.com/aJupEZUSsQKGY.gif)

[![Build Status](https://travis-ci.org/danne931/farm-life.svg?branch=master)](https://travis-ci.org/danne931/farm-life)
[![npm version](https://img.shields.io/npm/v/farm-life.svg?style=flat-square)](https://www.npmjs.com/package/farm-life)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
![](https://img.shields.io/badge/license-MIT-blue.svg)

## Install

```
$ npm install --save farm-life
```

Not using Node or a module bundler? Use a UMD build via the `<script>` tag.
- [https://npmcdn.com/farm-life/dist/farm-life.js](https://npmcdn.com/farm-life/dist/farm-life.js)
- [https://npmcdn.com/farm-life/dist/farm-life.min.js](https://npmcdn.com/farm-life/dist/farm-life.min.js)

## Usage

```javascript
import {
  append,
  prepend,
  ensureAppended,
  ensurePrepended
} from 'farm-life'

const haystack = '[]-$$the gr$$[]-eat gat$sby $$[]'
const needle = '$$'
const attachment = '[]-'

append(haystack, needle, attachment)  // '[]-$$[]-the gr$$[]-[]-eat gat$sby $$[]-[]'
ensureAppended(haystack, needle, attachment) // '[]-$$[]-the gr$$[]-eat gat$sby $$[]-[]'

prepend(haystack, needle, attachment)  // []-[]-$$the gr[]-$$[]-eat gat$sby []-$$[]
ensurePrepended(haystack, needle, attachment)  // '[]-$$the gr[]-$$[]-eat gat$sby []-$$[]'
```
