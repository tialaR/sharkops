import fs from 'node:fs';
import path from 'node:path';
import { exists, writeJsonAtomic } from '../core/io.mjs';
import { heading, row, ui } from '../core/ui.mjs';

export function runInit() {
  const projectFile = '.sharkops/project.json';

  if (exists(projectFile)) {
    console.error(ui.red('SharkOps is already initialized in this repository.'));
    process.exit(1);
  }

  fs.mkdirSync(path.join('.sharkops', 'state'), { recursive: true });
  fs.mkdirSync(path.join('.sharkops', 'policy'), { recursive: true });
  fs.mkdirSync(path.join('.sharkops', 'bites'), { recursive: true });
  fs.mkdirSync(path.join('.sharkops', 'reports'), { recursive: true });

  const projectName = path.basename(process.cwd());
  const now = new Date().toISOString();

  writeJsonAtomic(projectFile, {
    schemaVersion: 1,
    project: projectName,
    productName: projectName,
    engine: 'SharkOps',
    identity: {
      symbol: '🦈',
      tone: 'attack-control',
      colorMode: 'ansi'
    }
  });

  writeJsonAtomic('.sharkops/state/current-state.json', {
    phase: 'SharkOps initialized',
    lastBite: 'none',
    nextBite: 'SO-001 | Black Box',
    architecture: 'unclassified',
    knowledge: 'repository-backed',
    updatedAt: now
  });

  writeJsonAtomic('.sharkops/state/bite-ledger.json', {
    schemaVersion: 1,
    bites: []
  });

  heading('🦈 SHARKOPS INIT', 'TARGET ACQUIRED');
  row('Project:', projectName);
  row('State:', 'initialized');
  row('Next bite:', 'SO-001 | Black Box');

  console.log(
    `\n${ui.green('SharkOps personality created. No existing project contracts were modified.')}\n`
  );
}
