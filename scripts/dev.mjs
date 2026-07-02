// scripts/dev.mjs
//
// Orchestrates `ng build --watch` for the company-ui libraries in
// dependency order, so a downstream library's watcher never starts
// compiling before its upstream dependency has finished its first
// (re)build. Also holds `ng serve playground` until every lib watcher
// has completed at least one build.
//
// Why this exists: `ng-packagr --watch` clears+rewrites its `dest`
// folder on every rebuild, including the very first one it does when
// launched. Running all watchers (and the app dev server) via a single
// `concurrently` call starts them all at once, so a downstream project
// can read an upstream project's dist folder mid-rewrite and fail with
// TS2307 "Cannot find module". This script removes the race by waiting
// for a completion signal from each process's stdout before starting
// anything that depends on it.

import { spawn } from 'node:child_process';

const READY_PATTERN = /Compilation complete\. Watching for file changes/;

/**
 * Spawn `ng build <lib> --watch`, resolve once the first
 * "Compilation complete" line appears on stdout. The child process is
 * left running (watch mode) after that.
 */
function watchLib(name) {
  return new Promise((resolve, reject) => {
    const child = spawn('npx', ['ng', 'build', name, '--watch'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    });

    let ready = false;

    const onData = (buf) => {
      const text = buf.toString();
      process.stdout.write(`[${name}] ${text}`);
      if (!ready && READY_PATTERN.test(text)) {
        ready = true;
        resolve(child);
      }
    };

    child.stdout.on('data', onData);
    child.stderr.on('data', onData);

    child.on('exit', (code) => {
      if (!ready) {
        reject(new Error(`${name} watcher exited (code ${code}) before first build completed`));
      }
    });
  });
}

function spawnPassthrough(cmd, args, label) {
  const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], shell: true });
  child.stdout.on('data', (b) => process.stdout.write(`[${label}] ${b}`));
  child.stderr.on('data', (b) => process.stdout.write(`[${label}] ${b}`));
  return child;
}

async function main() {
  console.log('--- Phase 1: base libs (ui-utils, ui-icons, ui-theme) ---');
  await Promise.all([watchLib('ui-utils'), watchLib('ui-icons'), watchLib('ui-theme')]);
  console.log('--- Phase 1 complete ---\n');

  console.log('--- Phase 2: ui-core (depends on ui-utils, ui-icons, ui-theme) ---');
  await watchLib('ui-core');
  console.log('--- Phase 2 complete ---\n');

  console.log('--- Phase 3: ui-layout (depends on ui-core) ---');
  await watchLib('ui-layout');
  console.log('--- Phase 3 complete ---\n');

  console.log('--- All lib watchers stable. Starting playground dev server ---\n');
  spawnPassthrough('npx', ['ng', 'serve', 'playground'], 'playground');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
