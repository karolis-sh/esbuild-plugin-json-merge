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

esbuild
  .build({
    entryPoints: ['src/index.js'],
    outdir: 'build',
    plugins: [jsonMerge()],
  })
  .catch(() => process.exit(1));
```

## Options

### outfile

Type: `string`

[package-version-badge]: https://badge.fury.io/js/esbuild-plugin-json-merge.svg
[package-version]: https://www.npmjs.com/package/esbuild-plugin-json-merge
