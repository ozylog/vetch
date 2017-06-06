# @ozylog/fetch

[![Travis](https://img.shields.io/travis/ozylog/fetch.svg)](https://travis-ci.org/ozylog/fetch) [![npm](https://img.shields.io/npm/dt/@ozylog/fetch.svg)](https://www.npmjs.com/package/@ozylog/fetch)

## Installation
```
npm install @ozylog/fetch
```

## Usage Example

### fetch()
```javascript
// normal fetch
const response1 = await fetch('/users.html');
const body1 = await response.text();

const response2 = await fetch('/users.json');
const body2 = await response.json();
```

### fetchJson()
```javascript
type Response = {
  status: number,
  body: Object
};
const response1: Response = await fetchJson('/user.json');
const response2: Response = await fetchJson({
  url: '/user.json',
  method: 'POST',
  body: JSON.stringify({hello: 'world'})
});
```

### fetchGraphql()
```javascript
type Response = {
  status: number,
  body: Object
};
const response1: Response = await fetchGraphql({
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
