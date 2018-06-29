# Vetch

[![Travis](https://img.shields.io/travis/ozylog/vetch.svg)](https://travis-ci.org/ozylog/vetch)

## Installation
```
yarn add vetch
```

## Why

### Typescript friendly
Built with and for Typescript. no @types packages needed.

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

### Usage
```
vetch(url: string)

vetch(opts: VetchOptions)
```


## License
MIT
