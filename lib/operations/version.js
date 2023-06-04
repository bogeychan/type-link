import { getMyVersion } from '../utils.js';

/**
 * @param {string} tmpdir
 */
export function execute(tmpdir) {
  console.log(`type-link v${getMyVersion()}`);
  console.log(`cache is located at "${tmpdir}"`);
}
