import path from 'path';
import fse from 'fs-extra';
import { promisify } from 'util';
import globCB from 'glob';
import { Plugin } from 'esbuild';

import { Options, InputEntry } from './interface';

const glob = promisify(globCB);

const NAME = 'json-merge';

const getContentChunks = (entryPoints: InputEntry[]): Promise<any[]> =>
  Promise.all(
    entryPoints
      .filter((item) => item != null)
      .map((item, index) =>
        typeof item === 'string'
          ? glob(item).then((filenames) =>
              Promise.all(filenames.map((filename) => fse.readJSON(filename)))
            )
          : Promise.resolve(index === 0 ? JSON.parse(JSON.stringify(item)) : item)
      )
  ).then((items) => items.flat().filter((item) => item != null));

export default ({ entryPoints = [], outfile }: Options = {}): Plugin => ({
  name: NAME,
  async setup(build) {
    if (!outfile) throw new Error(`[${NAME}] outfile option is missing`);

    const destination = path.join(
      build.initialOptions.outdir || path.basename(build.initialOptions.outfile || ''),
      outfile
    );

    build.onStart(async () => {
      const chunks = await getContentChunks(entryPoints);
      const merged = chunks.length ? Object.assign(chunks) : undefined;
      if (merged != null) {
        await fse.mkdirp(path.dirname(destination));
        await fse.writeJSON(destination, merged, { spaces: 2 });
      }
    });
  },
});
