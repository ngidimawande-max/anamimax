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
  'multiplication',
  'division',
  'subtraction',
];

for (const copy of requiredCopy) {
  assert.match(html, new RegExp(copy), `Expected page to include ${copy}`);
}

const requiredIds = [
  'math-question',
  'math-answer',
  'math-level',
  'english-choices',
  'zulu-choices',
  'typing-input',
  'typing-check',
];

for (const id of requiredIds) {
  assert.match(html, new RegExp(`id="${id}"`), `Expected #${id} in HTML`);
  assert.match(js, new RegExp(`#${id}`), `Expected #${id} in JavaScript`);
}

const wordEntries = js.match(/\{ english: '[^']+', zulu: '[^']+', clue: '[^']+' \}/g) || [];
const englishWords = new Set(wordEntries.map((entry) => entry.match(/english: '([^']+)'/)[1]));
const zuluWords = new Set(wordEntries.map((entry) => entry.match(/zulu: '([^']+)'/)[1]));

assert.equal(wordEntries.length, 50, 'Expected exactly 50 vocabulary entries');
assert.equal(englishWords.size, 50, 'Expected 50 unique English words or phrases');
assert.equal(zuluWords.size, 50, 'Expected 50 unique isiZulu words or phrases');
assert.match(css, /\.games-grid/, 'Expected responsive game grid styles');
assert.match(js, /function getMathLevel\(\)/, 'Expected math levels for increasing challenge');
assert.match(js, /operations: \['\+', '-', '×', '÷'\]/, 'Expected math to include all four operations');
assert.match(js, /function getChoiceCount\(score\)/, 'Expected vocabulary choices to get harder');
assert.match(js, /const typingSentences = \[/, 'Expected typing practice data');
assert.match(workflow, /deploy-pages@v4/, 'Expected GitHub Pages deployment action');
assert.match(workflow, /npm test/, 'Expected GitHub Actions to run tests');

console.log('Anami Edu static site checks passed.');
