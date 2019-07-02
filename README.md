# Vetch

[![Travis](https://img.shields.io/travis/ozylog/vetch.svg)](https://travis-ci.org/ozylog/vetch) [![Coverage Status](https://coveralls.io/repos/github/ozylog/vetch/badge.svg?branch=develop)](https://coveralls.io/github/ozylog/vetch?branch=develop)

## Installation
```
yarn add vetch
```
or
```
npm install vetch
```

## Good Things
- Browser and node compatible
- Built-in typings
- `Fetch` context is not changed


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

## Chained Methods<a name="methods"></a>

some methods to parse response.body:

- text()
- json()
- blob()
- arrayBuffer()
- formData()

You can chain those methods after `vetch()` function. See [examples](#example) below for details.

## Response

Same response as `fetch`. Click [here](https://github.github.io/fetch/#Response) for details.
If `vetch` will be called alongside with one of [chained methods](#methods) above. Response will return additional field called `data` which contains parsed data of response body.

## Examples<a name="example"></a>
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
