# esbuild-plugin-json-merge

[![npm version][package-version-badge]][package-version]
[![Node.js CI](https://github.com/karolis-sh/esbuild-plugin-json-merge/actions/workflows/node.js.yml/badge.svg)](https://github.com/karolis-sh/esbuild-plugin-json-merge/actions/workflows/node.js.yml)
[![License: MIT](https://img.shields.io/badge/license-mit-yellow.svg)](https://opensource.org/licenses/MIT)

Merging multiple JSON sources into one via [esbuild](https://esbuild.github.io/)
pipeline.

## Installation

```bash
npm i postcss esbuild-plugin-json-merge -D
```

or

```bash
yarn add postcss esbuild-plugin-json-merge --dev
```

## Usage

```js
const esbuild = require('esbuild');
const jsonMerge = require('esbuild-plugin-json-merge');

const { version, name, description } = require('./package.json');

esbuild
  .build({
    entryPoints: ['src/index.js'],
    outdir: 'build',
    plugins: [
      jsonMerge({
        entryPoints: ['src/manifest.json', { version, name, description }],
        outfile: 'manifest.json',
      }),
    ],
  })
  .catch(() => process.exit(1));
```

## Options

### entryPoints

Type: `(string | object)[]`

An array of [glob](https://www.npmjs.com/package/glob) patterns or JSON objects
that should be merged.

### outfile

Type: `string`

JSON output destination.

[package-version-badge]: https://badge.fury.io/js/esbuild-plugin-json-merge.svg
[package-version]: https://www.npmjs.com/package/esbuild-plugin-json-merge
