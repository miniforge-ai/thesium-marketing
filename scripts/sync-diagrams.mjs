// Syncs the Ariadne architecture diagram SVGs into assets/diagrams/
// from their CANONICAL home — thesium-career's origin/main:
//
//   thesium-career  docs/architecture/diagrams/  ->  assets/diagrams/
//
// The repo is the single source of truth; this script is the only way
// diagrams enter the site. Reads from origin/main via git — the local
// checkout's branch or working tree state does not matter. Run after
// a diagram PR merges upstream, then commit the diff. Never edit an
// SVG here. (Same convention as miniforge-website/scripts/sync-diagrams.mjs.)
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ws = process.env.SYNC_WS || join(root, '..');

const repo = join(ws, 'thesium-career');
const src = 'docs/architecture/diagrams';
const dest = join(root, 'assets', 'diagrams');

const git = (args) =>
  execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

git(['fetch', 'origin', 'main', '--quiet']);
const files = git(['ls-tree', '-r', '--name-only', 'origin/main', '--', src])
  .split('\n')
  .filter((f) => f.endsWith('.svg'));
mkdirSync(dest, { recursive: true });
for (const f of files) {
  writeFileSync(join(dest, basename(f)), git(['show', `origin/main:${f}`]));
}
console.log(`thesium-career: ${files.length} diagrams -> assets/diagrams`);
