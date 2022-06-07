import { describe, it, expect, vi } from 'vitest';

import { sendDataRequest, sendDataRequestWithAxios } from './http';
import { axiosTestResponseData } from '../__mocks__/axios';
import { HttpError } from './errors';

// Mocking frontend library axios
vi.mock('axios');

// Mocking global values & functions
const testResponseData = { dataKey: 'data value' };

const testFetch = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    // reject if the body is not of type JSON (if JSON.stringify is not used)
    if (typeof options.body !== 'string') {
      reject('Not a string!');
    }

    const testResponse = {
      ok: true,
      status: 101,
      json: () => {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };

    resolve(testResponse);
  });
});

vi.stubGlobal('fetch', testFetch);

describe('sendDataRequest()', () => {
  it('should return any available response Data', () => {
    const testData = { key: 'test' };

    return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
  });

  it('should convert the provided data to JSON before sending the request', async () => {
    const testData = { key: 'test' };
    let errMessage;

    try {
      await sendDataRequest(testData);
    } catch (err) {
      errMessage = error;
    }

    expect(errMessage).not.toEqual('Not a string');
  });

  it('should throw error of HttpError type in case of non-ok response', () => {
    // implemented a different custom logic for "testFetch" to manipulate the "ok" response feature
    testFetch.mockImplementationOnce((url, options) => {
      return new Promise((resolve, reject) => {
        const testResponse = {
          ok: false,
          status: 101,
          json: () => {
            return new Promise((resolve, reject) => {
              resolve(testResponseData);
            });
          },
        };

        resolve(testResponse);
      });
    });

    const testData = { key: 'test' };

    return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
  });
});

describe('sendDataRequestWithAxios()', () => {
  it('should return any available response Data', () => {
    const testData = { key: 'test' };

    return expect(sendDataRequestWithAxios(testData)).resolves.toEqual(
      axiosTestResponseData
    );
  });
});
