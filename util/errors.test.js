import { describe, it, expect, beforeEach } from 'vitest';

import { HttpError, ValidationError } from './errors';

describe('Class HttpError', () => {
  beforeEach(() => {});

  it('should contain the provided statusCode, message and data', () => {
    const testStatusCode = 1;
    const testMessage = 'This is a test message';
    const testData = 'test data';

    const testError = new HttpError(testStatusCode, testMessage, testData);

    expect(testError).toHaveProperty('statusCode');
    expect(testError).toHaveProperty('message');
    expect(testError).toHaveProperty('data');
  });

  it('should contain undefined as data if no data value is provided', () => {
    const testStatusCode = 1;
    const testMessage = 'This is a test message';

    const testError = new HttpError(testStatusCode, testMessage);

    expect(testError).toHaveProperty('statusCode');
    expect(testError).toHaveProperty('message');
    expect(testError.data).toBeUndefined();
  });
});

describe('Class ValidationError', () => {
  it('should has message property', () => {
    let testMessage = 'test message';
    const testError = new ValidationError(testMessage);
    expect(testError).toHaveProperty('message');
  });

  it('should contain the provided message', () => {
    let testMessage = 'test message';
    const testError = new ValidationError(testMessage);
    expect(testError.message).toEqual(testMessage);
  });
});
