// Mocking global values & functions
import { describe, it, expect, vi } from 'vitest';

import { sendDataRequest } from './http';

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
  it('should always return responseData', () => {
    const testData = { key: 'test' };

    return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
  });
});
