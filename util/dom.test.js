/*
 *First we need to open the HTML file and load it into the virtually emulated Dom which is provided by "js-dom" or "happy-dom", so when we interact with the virtual DOM it would has the HTML tree that we are interacting with in our unit tests.
 */

// to open file and load the index.html file
import fs from 'fs'; // the file system module from node JS
import path from 'path';

import { describe, it, vi, expect, beforeEach } from 'vitest';
import { Window } from 'happy-dom';

import { showError } from './dom';

const htmlDocPath = path.join(process.cwd() + '/index.html'); // get the index file path
// readFileSync() to halt code execution until the index file has been read
// tosString() to read the content of te index file as string
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();
const window = new Window(); // create an emulated browser window
const document = window.document; // create the virtual document

// replace document object with the virtual happy-dom document object globaly
vi.stubGlobal('document', document);

beforeEach(() => {
  document.body.innerHTML = '';
  document.write(htmlDocumentContent); // append index file content to the virtual document
});

describe('showError()', () => {
  it('should add error paragraph to the id="errors" element', () => {
    showError('Test');

    const errorEl = document.getElementById('errors');
    const errorParagraph = errorEl.firstElementChild;

    expect(errorParagraph).not.toBeNull();
  });

  it('should not contain an error paragraph initially', () => {
    const errorEl = document.getElementById('errors');
    const errorParagraph = errorEl.firstElementChild;

    expect(errorParagraph).toBeNull();
  });

  it('should display the provided error message in the error paragraph', () => {
    const errorMessage = 'Test';

    showError(errorMessage);

    const errorEl = document.getElementById('errors');
    const errorParagraph = errorEl.firstElementChild;

    expect(errorParagraph.textContent).toEqual(errorMessage);
  });
});
