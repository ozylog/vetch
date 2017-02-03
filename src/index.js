'use strict';

import nodeFetch from 'node-fetch';

export async function fetch(req) {
  try {
    let body;
    let url = req.url || req.uri;
    const method = req.method || 'GET';
    const headers = req.headers || {};

    if (req.jsonData) {
      headers['Content-Type'] = 'application/json';
      headers.Accept = 'application/json';
      body = JSON.stringify(req.jsonData);
    }

    if (req.urlData) {
      let query = '';

      for (let key in req.urlData) {
        if (req.urlData[key]) {
          const value = req.urlData[key];
          key = encodeURI(key);

          if (value instanceof Array) {
            value.forEach((v) => {
              query += `&${key}[]=${encodeURI(v)}`;
            });
          } else {
            query += `&${key}=${encodeURI(value)}`;
          }
        }
      }
      if (query) {
        query = query.substr(1);
        url += `?${query}`;
      }
    }

    if (!headers.Accept) headers.Accept = 'application/json';

    const res = await nodeFetch(url, {method, headers, body});

    return res;
  } catch (err) {
    throw err;
  }
}

export async function fetchJson(req) {
  try {
    const res = await fetch(req);
    const json = await res.json();

    if (res.status !== 200) throw new Error(json);

    const result = {
      status: res.status,
      body: json
    };

    return result;
  } catch (err) {
    return err;
  }
}
