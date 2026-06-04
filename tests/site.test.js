const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');

const html = readFileSync('index.html', 'utf8');
const css = readFileSync('styles.css', 'utf8');
const js = readFileSync('script.js', 'utf8');
const workflow = readFileSync('.github/workflows/pages.yml', 'utf8');

const requiredCopy = [
  'Anami Edu',
  'Math Mission',
  'English Builder',
  'Zulu Words',
  'Typing Trail',
];

for (const copy of requiredCopy) {
  assert.match(html, new RegExp(copy), `Expected page to include ${copy}`);
}

const requiredIds = [
  'math-question',
  'math-answer',
  'english-choices',
  'zulu-choices',
  'typing-input',
  'typing-check',
];

for (const id of requiredIds) {
  assert.match(html, new RegExp(`id="${id}"`), `Expected #${id} in HTML`);
  assert.match(js, new RegExp(`#${id}`), `Expected #${id} in JavaScript`);
}

assert.match(css, /\.games-grid/, 'Expected responsive game grid styles');
assert.match(js, /const zuluQuestions = \[/, 'Expected Zulu game data');
assert.match(js, /const typingSentences = \[/, 'Expected typing practice data');
assert.match(workflow, /deploy-pages@v4/, 'Expected GitHub Pages deployment action');
assert.match(workflow, /npm test/, 'Expected GitHub Actions to run tests');

console.log('Anami Edu static site checks passed.');
