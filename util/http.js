import { HttpError } from './errors.js';
import axios from 'axios';

// to apply on mocking global values
export async function sendDataRequest(data) {
  const response = await fetch('https://dummy-site.dev/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new HttpError(
      response.status,
      'Sending the request failed.',
      responseData
    );
  }

  return responseData;
}

// to apply on mocking frontend libraries
export async function sendDataRequestWithAxios(data) {
  const responseData = axios({
    method: 'post',
    url: 'https://dummy-site.dev/posts',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => data)
    .catch((error) => {
      if (error.response) {
        throw new HttpError(
          error.response.status,
          'Sending the request failed.',
          error.response.data
        );
      }
    });

  return responseData;
}
