// global custom axios logic
import { vi } from 'vitest';

export const axiosTestResponseData = { testKey: 'dataValue' };

const axios = vi.fn((options) => {
  const { method, url, data, headers } = options;

  return new Promise((resolve, reject) => {
    resolve(axiosTestResponseData);
  });
});

export default axios;
