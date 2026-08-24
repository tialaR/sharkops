import fs from 'node:fs';
import path from 'node:path';
import { readJson, writeJsonAtomic } from '../core/io.mjs';
import { heading, row, ui } from '../core/ui.mjs';

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function runNew(args = []) {
  const id = args[0];
  const name = args.slice(1).join(' ');

  if (!id || !name) {
    console.error(ui.red('Usage: sharkops new <id> <name>'));
    process.exit(1);
  }

  const slug = `${slugify(id)}-${slugify(name)}`;
  const bitePath = path.join('.sharkops', 'bites', slug);

  if (fs.existsSync(bitePath)) {
    console.error(ui.red(`Bite already exists: ${slug}`));
    process.exit(1);
  }

  fs.mkdirSync(path.join(bitePath, 'payload'), { recursive: true });
  fs.mkdirSync(path.join(bitePath, 'reports'), { recursive: true });

  const scripts = {
    'apply.sh': `#!/usr/bin/env bash
set -euo pipefail

echo "APPLY ${id} | ${name}"
echo "No payload defined yet."
`,
    'verify.sh': `#!/usr/bin/env bash
set -euo pipefail

echo "VERIFY ${id} | ${name}"
echo "No verification defined yet."
`,
    'rollback.sh': `#!/usr/bin/env bash
set -euo pipefail

echo "ROLLBACK ${id} | ${name}"
echo "No rollback actions defined yet."
`
  };

  for (const [file, content] of Object.entries(scripts)) {
    const target = path.join(bitePath, file);
    fs.writeFileSync(target, content);
    fs.chmodSync(target, 0o755);
  }

  writeJsonAtomic(path.join(bitePath, 'MANIFEST.json'), {
    schemaVersion: 1,
    id,
    name,
    slug,
    status: 'DRAFT',
    revision: 1,
    reversible: true,
    createdAt: new Date().toISOString()
  });

  const ledgerPath = '.sharkops/state/bite-ledger.json';
  const ledger = readJson(ledgerPath);

  ledger.bites.push({
    id,
    name,
    slug,
    status: 'DRAFT'
  });

  writeJsonAtomic(ledgerPath, ledger);

  heading('🦈 SHARKOPS NEW BITE', 'DRAFT CREATED');
  row('ID:', id);
  row('Name:', name);
  row('Slug:', slug);
  row('Rollback:', 'required');

  console.log(`\n${ui.green('Reversible bite skeleton created.')}\n`);
}
