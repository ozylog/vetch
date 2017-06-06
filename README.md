# @ozylog/fetch

[![Travis](https://img.shields.io/travis/ozylog/fetch.svg)](https://travis-ci.org/ozylog/fetch) [![npm](https://img.shields.io/npm/dt/@ozylog/fetch.svg)](https://www.npmjs.com/package/@ozylog/fetch)

## Installation
```
npm install @ozylog/fetch
```

## Usage Example
```javascript
// normal fetch
const response = await fetch('/users.html');
const body = response.text();

const response = await fetch('/users.json');
const body = response.json();
```

```javascript
type Response = {
  status: Number,
  body: Object
};
const response: Response = fetchJson('/user.json');
const response: Response = fetchJson({
  url: '/user.json',
  method: 'POST',
  body: JSON.stringify({hello: 'world'})
});
```

```javascript
const response: Response = fetchGraphql({
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
