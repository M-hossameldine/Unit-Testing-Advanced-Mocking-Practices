import { describe, it, expect, beforeEach } from 'vitest';

import { validateNotEmpty } from './validation';

describe('validationNotEmpty()', () => {
  let testText;
  let testErrorMessage;
  let validateFn;

  beforeEach(() => {
    testText = '';
    testErrorMessage = 'test message';

    validateFn = () => validateNotEmpty(testText, testErrorMessage);
  });

  it('should throw an error if provided with empty string', () => {
    expect(validateFn).toThrow();
  });

  it('should throw error with message if provided', () => {
    expect(validateFn).toThrow(testErrorMessage);
  });

  it('should throw an error if provided with an empty string with blank spaces as a value', () => {
    testText = '  ';

    validateFn = () => validateNotEmpty(testText, testErrorMessage);

    expect(validateFn).toThrow();
  });

  it('should not throw error if provided with valid string', () => {
    testText = 'Valid';

    validateFn = () => validateNotEmpty(testText, testErrorMessage);

    expect(validateFn).not.toThrow();
  });
});
