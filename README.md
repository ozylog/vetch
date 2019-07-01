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

### Isomorphic
Browser and node compatible.

### Simple
```
// Fetch
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

fetch('/users')
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
  }).catch(function(error) {
    console.log('request failed', error)
  });


// Vetch
vetch('/users').json()
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
  }).catch(function(error) {
    console.log('request failed', error)
  });
```

### Support object query
```
// Fetch
fetch('/users?ids[]=1&ids[]=2&city=auckland');

// Vetch
vetch({
  url: '/users',
  query: {
    ids: [ 1, 2 ],
    city: 'auckland'
  }
});
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
