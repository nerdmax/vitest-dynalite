# vitest-dynalite

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> My awesome module

## Install

```bash
npm install vitest-dynalite
```

## Usage

```ts
import { setupDynamoDB } from 'vitest-dynalite';

setupDynamoDB([
  {
    KeySchema: [
      {
        AttributeName: 'pk',
        KeyType: 'HASH', // Partition key
      },
      {
        AttributeName: 'sk',
        KeyType: 'RANGE', // Sort key
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'pk',
        AttributeType: 'S',
      },
      {
        AttributeName: 'sk',
        AttributeType: 'S',
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    TableName: 'testTable',
  },
]);
```

## API

[build-img]: https://github.com/nerdmax/vitest-dynalite/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/nerdmax/vitest-dynalite/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/vitest-dynalite
[downloads-url]: https://www.npmtrends.com/vitest-dynalite
[npm-img]: https://img.shields.io/npm/v/vitest-dynalite
[npm-url]: https://www.npmjs.com/package/vitest-dynalite
[issues-img]: https://img.shields.io/github/issues/nerdmax/vitest-dynalite
[issues-url]: https://github.com/nerdmax/vitest-dynalite/issues
[codecov-img]: https://codecov.io/gh/nerdmax/vitest-dynalite/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/nerdmax/vitest-dynalite
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
