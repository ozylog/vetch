# @ozylog/fetch

[![Travis](https://img.shields.io/travis/ozylog/fetch.svg)](https://travis-ci.org/ozylog/fetch) [![npm](https://img.shields.io/npm/dt/@ozylog/fetch.svg)](https://www.npmjs.com/package/@ozylog/fetch)

## Installation
```
npm install @ozylog/fetch
```

## Usage Example

### fetch()
```javascript
import {fetch} from @ozylog/fetch;

const response1 = await fetch('/users.html');
const body1 = await response.text();

const response2 = await fetch('/users.json');
const body2 = await response.json();
```

### fetchJson()
```javascript
// @flow

import {fetchJson} from @ozylog/fetch;

type ResponseType = {
  status: number,
  body: Object
};

const response1: ResponseType = await fetchJson('/user.json');
const response2: ResponseType = await fetchJson({
  url: '/user.json',
  method: 'POST',
  body: JSON.stringify({hello: 'world'})
});
const response3: ResponseType = await fetchJson({
  url: '/user.json',
  method: 'GET',
  query: {
    ids: [1, 2],
    country: 'AU'
  }
}); // /user.json?ids[]=1&ids[]=2&country=AU
```

### fetchGraphql()
```javascript
// @flow

import {fetchGraphql} from @ozylog/fetch;

type ResponseType = {
  status: number,
  body: Object
};

const response1: ResponseType = await fetchGraphql({
  url: '/graphql',
  query: `{
    user {
      _id
      firstName
      lastName
      email
    }
  }`,
  variables: null
});
```

## License
MIT
