import * as fs from 'node:fs';
import * as path from 'node:path';

let _myVersion;

/**
 * @returns { string}
 */
export function getMyVersion() {
  if (typeof _myVersion === 'undefined') {
    _myVersion = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'package.json'), {
        encoding: 'utf-8'
      })
    ).version;
  }
  return _myVersion;
}

/**
 * @param {any} data
 * @param {{ stringify?: (data: any) => string }} arguments
 */
export function stringify(data, { stringify } = {}) {
  return (stringify ?? JSON.stringify)(data, null, '\t');
}
