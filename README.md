# Vetch

[![Travis](https://img.shields.io/travis/ozylog/vetch.svg?branch=master)](https://travis-ci.org/ozylog/vetch.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/ozylog/vetch/badge.svg?branch=master)](https://coveralls.io/github/ozylog/vetch?branch=master)
![David](https://img.shields.io/david/ozylog/vetch.svg)
![npm](https://img.shields.io/npm/v/vetch.svg)
![NPM](https://img.shields.io/npm/l/vetch.svg)

## Install
```
yarn add vetch
```

## Good Things
- Browser and node compatible
- Built-in typings. Please add `dom` in `compilerOptions.lib` in your tsconfig.json
- What you can do on fetch, you can do on vetch too.

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
- blob()
- arrayBuffer()
- formData()

You can chain those methods after `vetch()` function. See [usage examples](#usage-examples) below for details.

## Response

Same as [Fetch response]https://github.github.io/fetch/#Response) with additional field called `data` which contains parsed data of the response body if `vetch` will be called alongside with one of the [chained methods](#chained-methods) above.

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
