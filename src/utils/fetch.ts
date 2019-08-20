import fetch from 'isomorphic-fetch'

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error: any = new Error(response.statusText);
  error.response = response;
  throw error;
}

function handelArg(params: {[key: string]: any}): string {
  let query = '?';
  Object.entries(params).map(([key, value]) => {
    query += `${value}&`
  });
  query = query.substring(0, query.length - 1);
  return query;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url: string, options: Options = {}) {
  const method = (options.method || 'get').toLocaleLowerCase()
  options.headers = {}
  if (method === 'post' || method === 'put' || method === 'patch') {
    options.headers['Content-type'] = 'application/json'
  }
  let _url = '';
  _url += url + handelArg(options.params);
  delete options.params;
  return fetch(_url, options)
    .then(response => {})
    .then(parseJSON)
    .then(data => {
      caches.open('API_CACHE').then(cache => {
        // cache.put()
      })
      return data;
    })
    .catch(err => err);
}

interface Options extends RequestInit {
  params?: {[key: string]: any}
}
