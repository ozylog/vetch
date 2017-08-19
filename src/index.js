'use strict';

import 'isomorphic-fetch';

function queryStringify(queryObject) {
  let query = '';

  for (let key in queryObject) {
    const value = queryObject[key];
    key = encodeURI(key);

    if (value instanceof Array) {
      for (const v of value) {
        query += `&${key}[]=${encodeURI(v)}`;
      }
    } else {
      query += `&${key}=${encodeURI(value)}`;
    }
  }

  if (query) query = query.substr(1);

  return query;
}

async function request(param) {
  let url = param.url || param.uri;
  const method = param.method || 'GET';
  const headers = param.headers || {};

  if (param.json) {
    headers['Content-Type'] = 'application/json';
    headers.Accept = 'application/json';
  }
  if (param.query) {
    url += queryStringify(param.query);
  }

  const opts = {method};

  if (Object.keys(headers).length) Object.assign(opts, {headers});
  if (param.body) Object.assign(opts, {body: param.body});
  if (param.credentials) Object.assign(opts, {credentials: param.credentials});

  const res = await fetch(url, opts);

  return res;
}

export async function fetchJson(param) {
  const paramReq = {json: true};
  Object.assign(paramReq, param.constructor === String ? {url: param} : param);
  const res = await request(paramReq);
  const jsonBody = await res.json();
  const result = {
    status: res.status,
    body: jsonBody,
    headers: res.headers,
    url: res.url
  };

  if (!res.ok) {
    const error = new Error(res.statusText);

    Object.assign(error, result);
    throw error;
  }

  return result;
}

export async function fetchGraphql(param) {
  const {uri, url, query, variables, ...others} = param;
  const paramReq = Object.assign({
    url: url || uri,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    json: true
  }, others);

  const res = await request(paramReq);
  const jsonBody = await res.json();
  const result = {
    status: res.status,
    headers: res.headers,
    url: res.url
  };

  if (!res.ok || jsonBody.errors) {
    const error = new Error(!res.ok ? res.statusText : 'GraphQL Error');

    Object.assign(error, result, {body: jsonBody.errors || []});
    throw error;
  }

  let body = null;

  if (jsonBody.data) {
    const key = Object.keys(jsonBody.data)[0];

    body = jsonBody.data[key];
  }

  Object.assign(result, {body});

  return result;
}

export default fetch;
