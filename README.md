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

## Features
- Browser and node compatible
- Built-in typings

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



```


```

### Fetch look-alike

#### Request
```
// Fetch
fetch(url: string);

// Vetch
vetch(url: string);

-----------------------------------------------------------------------

// Fetch
fetch(url: string, options: FetchOptions);


// Vetch
vetch(VetchOptions);

Which VetchOptions fields is all fields available in FetchOptions plus additional fields below

| field   | required         | type                                         |
|---------|------------------|----------------------------------------------|
| url     | true             | string                                       |
| query   | false (optional) | object                                       |
| payload | false (optional) | all FetchOptions.body support plus an object |
```

#### Response
```
Vetch response is pretty much same as Fetch response with additional "data" field as parsed value of response.body.

const { data: users } = await vetch('/users').json();
```

## License
MIT
