# type-link

_EXPERIMENTAL_: Retrieve type definitions from a URL (like [Deno](https://deno.com/manual@v1.34.1/advanced/typescript/types#deno-friendly-cdns))

## Installation

```bash
npm install --global type-link
```

## CLI Usage

```bash
(npx / bunx) type-link <operation> <options>
```

### Operations

- `cache <filename> [--clear] [--reload]`
  - cache http(s) type-imports (import "https://../type.d.ts";)
- `version`
  - prints version and _cache location_
- `usage`
  - prints usage

## Examples

Checkout the [examples](./examples/) folder on GitHub.

```ts
// index.ts
import type { KeyLike } from 'https://deno.land/x/jose@v4.13.2/types.d.ts';
```

Make sure you're inside your project's root directory.

### Cache all type-imports used by "index.ts"

```bash
type-link cache ./index.ts
```

### Reload and cache all type-imports used by "index.ts"

```bash
type-link cache ./index.ts --reload
```

### Clear global cache

```bash
type-link cache --clear
```
