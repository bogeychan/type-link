#!/usr/bin/env node

import * as os from 'node:os';
import * as fs from 'node:fs';
import * as path from 'node:path';

import minimist from 'minimist';

import './globals.js';
import { getMyVersion } from './lib/utils.js';

const argv = minimist(process.argv.slice(2));

const [operation, argument] = argv._;

const tmpdir = path.join(os.tmpdir(), 'type-link');
const configfile = path.join(tmpdir, 'config.json');

if (!fs.existsSync(tmpdir)) {
  fs.mkdirSync(tmpdir);
}

if (fs.existsSync(configfile)) {
  const config = JSON.parse(fs.readFileSync(configfile, { encoding: 'utf-8' }));

  if (getMyVersion() !== config.version) {
    console.warn(
      'Cache entries from a different version can cause problems due to the version mismatch'
    );
    console.warn('Run "type-link cache --clear" to clear the global cache');
  }
} else {
  fs.writeFileSync(configfile, JSON.stringify({ version: getMyVersion() }));
}

function getConfigFile() {
  return JSON.parse(fs.readFileSync(configfile, { encoding: 'utf-8' }));
}

/**
 * @param {any} config
 */
function writeConfigFile(config) {
  fs.writeFileSync(configfile, JSON.stringify(config));
}

const operations = {
  cache: async () => {
    const { execute } = await import('./lib/operations/cache.js');
    await execute({
      target: argument,
      getConfigFile,
      tmpdir,
      writeConfigFile,
      options: argv
    });
  },
  version: async () => {
    const { execute } = await import('./lib/operations/version.js');
    execute(tmpdir);
  },
  usage: () => {
    console.log(`Usage: type-link <operation> <options>

Operations:
  cache <filename> [--clear] [--reload] // cache http(s) type-imports (import "https://../type.d.ts";)
  version                               // prints version and cache location
  usage                                 // prints usage

Examples:
  cache ./index.ts            // Cache all imports used by "index.ts"
  cache ./index.js --reload   // Reload and cache all imports used by "index.ts"
  cache --clear               // Clear global cache`);
  }
};

await (operations[operation] ?? operations['usage'])();

