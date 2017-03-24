import mapValues from 'lodash/mapValues';
import queryString from 'query-string';




const makeApiRoute = (route, queryParams = {}) => {
  const longParams = mapValues(queryParams, JSON.stringify);
  console.log(queryString.stringify(longParams));
  return `http://localhost:8000/${route}?${queryString.stringify(longParams)}`
};

export default {
  get: (route, params) => {
    return fetch(makeApiRoute(route, params))
      .then(resource => resource.json())
      .then(json => json.data);
  },
  put: (route, body) => {
    return fetch(makeApiRoute(route), {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(body),
    })
      .then(resource => resource.json())
      .then(json => json.data);
  }
}
