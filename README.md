# Vetch
![Build](https://badgen.net/travis/ozylog/vetch/master)
![Coverage](https://badgen.net/coveralls/c/github/ozylog/vetch/master)
![Size](https://badgen.net/bundlephobia/minzip/vetch)
![DevDependencies](https://badgen.net/david/dev/ozylog/vetch)
![LatestVersion](https://badgen.net/npm/v/vetch)
![License](https://badgen.net/npm/license/vetch)

Simple fetch-wrapper

## Install
```
yarn add vetch
```

## Setup
For nodejs, please install [node-fetch](https://www.npmjs.com/package/node-fetch) package then call function `setVetch` in main or index file.
```
import { setVetch } from 'vetch';
import fetch from 'node-fetch';

setVetch({ fetch });
```

For browser, please install [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch) then import that package in main or index file.
```
import 'whatwg-fetch';
```

## Perks
- Browser and node compatible
- Built-in typings. Please add `dom` in `compilerOptions.lib` in your tsconfig.json
- What you can do on fetch, you can do on vetch too.
- Zero dependencies

## Request
```
vetch(url: string, options?: Options)
```

Options

All fetch [optional fields](https://github.github.io/fetch/#options) plus additional fields below.

| field   | type                                                             |
|---------|------------------------------------------------------------------|
| query   | Object                                                           |
| payload | [options.body](https://github.github.io/fetch/#request-body) + Object |

## Chained Methods
Some methods for response.body:
- text()
- json()
- blob() *
- arrayBuffer() *
- formData() *

You can chain those methods after `vetch()` function. See [usage examples](#usage-examples) below for details.

(*) Some methods are not available on certain fetch versions

## Response
Same as [Fetch response](https://github.github.io/fetch/#Response) with additional field called `data` which contains parsed data of the response body if `vetch` will be called alongside with one of the [chained methods](#chained-methods) above.

## Usage Examples
```
const { data, headers } = await vetch('/users').json();
// note: data is json parsed response body

// support object for request.query
const { data, headers } = await vetch('/users', {
  query: {
    ids: [ 1, 2 ],
    city: 'auckland'
  }
}).json();
// note: for url /users?ids[]=1&ids[]=2&city=auckland

// support object for request.body
const { data, headers } = await vetch('/users', {
  method: 'POST',
  payload: { name: 'John'}
}).json();
// fetch.option.body: JSON.stringify({ name: 'John' }) equivalent

// If you don't need to parse response body
const response = await vetch('/users');
```

## License
MIT
