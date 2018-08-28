import { get } from '../utils/fetch';
import endpoints from '../utils/apiEndpoints';

export const tweets = () => {
  return new Promise((resolve, reject) => {
    return get(endpoints.tweets(), {})
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};
