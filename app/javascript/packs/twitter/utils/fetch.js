import { stringify } from 'qs';
import { curry, isEmpty } from 'lodash';
import { getToken } from './token';

const API_VERSION = 1;
const ACCEPT_HEADER = { Accept: `application/json; version=${API_VERSION}` };
const CONTENT_TYPE_HEADER = { 'Content-type': 'application/json' };

/**
 * Wrapper for built-in `fetch` which adds the expected Authorization header to the
 * request.  If no access token is available, a rejected Promise will be returned.
 *
 * @param {string} url - The URL to fetch from
 * @param {object} options - Standard options for fetch
 * @returns {Promise}
 */
const authenticatedFetch = (url, options) => {
  const accessToken = getToken();

  if (!accessToken) {
    return Promise.reject(
      new Error(
        `Attempting to access an API that requires authentication, but no auth token is available. URL=${url}`
      )
    );
  }

  const authedOpts = {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  };

  return fetch(url, authedOpts);
};

const makeApiUrl = (endpoint, query) => {
  const queryString = stringify(query);
  return `${endpoint}${queryString ? '?' : ''}${queryString}`;
};

const parseJSON = response => new Promise(resolve => response.json().then(json => resolve({
        status: response.status,
        ok: response.ok,
        json,
      })
    )
  );

const buildFetchArgs = ({ method, headers = {}, requestBody = {} }) => {
  const fetchOpts = {
    method,
    headers: {
      ...ACCEPT_HEADER,
      ...CONTENT_TYPE_HEADER,
      ...headers,
    },
  };
  return isEmpty(requestBody)
    ? fetchOpts
    : { ...fetchOpts, body: JSON.stringify(requestBody) };
};

function execute(
  method,
  endpoint,
  { query, auth = false, headers = {}, requestBody = {} } = {}
) {
  const url = makeApiUrl(endpoint, query);
  const options = buildFetchArgs({ method, headers, requestBody });
  const fetchFn = auth ? authenticatedFetch : fetch;
  return new Promise((resolve, reject) => {
    fetchFn(url, options)
      .then(parseJSON)
      .then(response => {
        if (response.ok) {
          return resolve(response.json);
        }
        // extract the error from the server's json
        return reject(response.json);
      })
      .catch(error => reject(new Error(error)));
  });
}

// These are the functions that are exported for use:
export { makeApiUrl };
export const get = curry(execute)('GET');
export const post = curry(execute)('POST');
export const patch = curry(execute)('PATCH');
export const put = curry(execute)('PUT');
// Any other functions exported above are only exported for test purposes.
