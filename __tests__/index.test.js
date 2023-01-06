const os = require('os');
const path = require('path');

const { build } = require('esbuild');
const fse = require('fs-extra');

const jsonMerge = require('../lib');

const FIXTURES_DIR = path.join(
  path.relative(process.cwd(), __dirname),
  '__fixtures__',
);

const merge = async (options) => {
  const outdir = path.join(
    os.tmpdir(),
    'esbuild-plugin-json-merge',
    Date.now().toString(),
  );

  await build({
    entryPoints: [path.join(FIXTURES_DIR, 'index.js')],
    outdir,
    outbase: FIXTURES_DIR,
    bundle: true,
    plugins: [jsonMerge(options)],
    sourcemap: true,
  });

  return fse.readJSON(path.join(outdir, options.outfile));
};

it('should merge file with object', async () => {
  const json = await merge({
    entryPoints: [
      path.join(FIXTURES_DIR, 'manifest.json'),
      { version: '-001' },
    ],
    outfile: 'data/out.json',
  });
  expect(json).toEqual({
    name: 'The Great',
    description: 'something something',
    version: '-001',
  });
});

it('should merge list files', async () => {
  const json = await merge({
    entryPoints: [path.join(FIXTURES_DIR, 'lists/*.json')],
    outfile: 'out.json',
  });
  expect(json).toEqual([null, 1, false, 4, 5]);
});
