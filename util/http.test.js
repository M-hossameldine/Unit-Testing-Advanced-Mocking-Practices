import { describe, it, expect, vi } from 'vitest';

import { sendDataRequest, sendDataRequestWithAxios } from './http';
import { axiosTestResponseData } from '../__mocks__/axios';

// Mocking frontend library axios
vi.mock('axios');

// Mocking global values & functions
const testResponseData = { dataKey: 'data value' };

const testFetch = (url, options) => {
  return new Promise((resolve, reject) => {
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
};

vi.stubGlobal('fetch', testFetch);

describe('sendDataRequest()', () => {
  it('should return any available response Data', () => {
    const testData = { key: 'test' };

    return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
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
