// scripts/publish.mjs
//
// Builds every library then publishes each dist package to GitHub
// Packages. Requires an .npmrc (repo root or user-level) authenticating
// against npm.pkg.github.com — see SETUP.md.
//
// Usage: node scripts/publish.mjs [--dry-run]

import { execSync } from 'node:child_process';

const LIBS = ['ui-utils', 'ui-icons', 'ui-theme', 'ui-core', 'ui-layout'];
const dryRun = process.argv.includes('--dry-run');

function run(cmd, cwd) {
  console.log(`$ ${cmd}${cwd ? `  (in ${cwd})` : ''}`);
  execSync(cmd, { stdio: 'inherit', cwd });
}

console.log('--- Building all libraries ---');
run(`npx ng build ${LIBS.join(' && npx ng build ')}`);

for (const lib of LIBS) {
  console.log(`\n--- Publishing ${lib} ---`);
  run(`npm publish${dryRun ? ' --dry-run' : ''}`, `dist/${lib}`);
}

console.log('\nDone.');
