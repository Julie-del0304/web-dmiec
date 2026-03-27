import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const target = 'src/pages/placement/records/page.tsx';

if (!existsSync(target)) process.exit(0);

const source = readFileSync(target, 'utf8');
const cleaned = source.replace(/^import\s+\*\s+as\s+XLSX\s+from\s+['\"]xlsx['\"];\s*\n/m, '');

if (cleaned !== source) {
  writeFileSync(target, cleaned);
  console.log('[prepare-build] Removed legacy xlsx import from placement records page.');
}
