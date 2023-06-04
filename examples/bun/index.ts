import type { KeyLike } from 'https://deno.land/x/jose@v4.14.4/types.d.ts';
import { key } from './deps';

console.log(key, { type: 'test' } satisfies KeyLike);
