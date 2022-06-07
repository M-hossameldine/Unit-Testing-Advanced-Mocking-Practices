// using local mock values
import { describe, it, expect, beforeEach } from 'vitest';

import { extractPostData } from './posts';

let testTitle = 'test title';
let testContent = 'test content';
let testPostData;

describe('extractPostData()', () => {
  beforeEach(() => {
    testPostData = {
      title: testTitle,
      content: testContent,
      get(identifier) {
        return this[identifier];
      },
    };
  });

  it('should extract form data correctly', () => {
    let testData = extractPostData(testPostData);

    expect(testData.title).toEqual(testTitle);
    expect(testData.content).toEqual(testContent);
  });
});
