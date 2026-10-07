const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');

const html = readFileSync('index.html', 'utf8');
const css = readFileSync('styles.css', 'utf8');
const js = readFileSync('script.js', 'utf8');
const workflow = readFileSync('.github/workflows/pages.yml', 'utf8');

for (const copy of ['Northstar', 'Portfolio performance', 'Asset allocation', 'Your investments', 'Insights for you']) {
  assert.match(html, new RegExp(copy, 'i'), `Expected page to include ${copy}`);
}

for (const role of ['client', 'broker', 'management', 'company']) {
  assert.match(html, new RegExp(`value="${role}"`), `Expected ${role} dashboard role`);
}

for (const id of ['role-switcher', 'portfolio-total', 'update-portfolio', 'update-dialog', 'portfolio-form', 'toast']) {
  assert.match(html, new RegExp(`id="${id}"`), `Expected #${id} in HTML`);
  assert.match(js, new RegExp(`#${id}`), `Expected #${id} in JavaScript`);
}

assert.match(css, /@media\(max-width:760px\)/, 'Expected responsive mobile styles');
assert.match(css, /conic-gradient/, 'Expected asset allocation chart styles');
assert.match(js, /showModal\(\)/, 'Expected editable portfolio dialog behavior');
assert.match(js, /toLocaleString\('en-ZA'\)/, 'Expected South African number formatting');
assert.match(workflow, /deploy-pages@v4/, 'Expected GitHub Pages deployment action');
assert.match(workflow, /npm test/, 'Expected GitHub Actions to run tests');

console.log('Northstar portfolio dashboard checks passed.');
