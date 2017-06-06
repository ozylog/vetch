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
  try {
    let body;
    let url = param.url || param.uri;
    const method = param.method || 'GET';
    const headers = param.headers || {};

    if (param.body) body = param.body;
    if (param.json) {
      headers['Content-Type'] = 'application/json';
      headers.Accept = 'application/json';
    }
    if (param.query) {
      url += queryStringify(param.query);
    }

    const res = await fetch(url, {method, headers, body});

    return res;
  } catch (err) {
    throw err;
  }
}

export async function fetchJson(param) {
  try {
    const paramReq = {json: true};
    Object.assign(paramReq, param.constructor === String ? {url: param} : param);
    const res = await request(paramReq);
    const jsonBody = await res.json();
    const result = {
      status: res.status,
      body: jsonBody
    };

    return result;
  } catch (err) {
    return err;
  }
}

export async function fetchGraphql(param) {
  try {
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
      body: jsonBody
    };

    return result;
  } catch (err) {
    return err;
  }
}

export default fetch;
