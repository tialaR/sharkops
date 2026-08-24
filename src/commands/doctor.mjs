import { exists } from '../core/io.mjs';
import { heading, pass, fail, ui } from '../core/ui.mjs';

export function runDoctor() {
  const checks = [
    ['package.json', 'package.json'],
    ['CLI', 'bin/sharkops.mjs'],
    ['SharkOps config', '.sharkops/project.json'],
    ['SharkOps state', '.sharkops/state/current-state.json'],
    ['Bite ledger', '.sharkops/state/bite-ledger.json'],
    ['Core IO', 'src/core/io.mjs'],
    ['Core UI', 'src/core/ui.mjs'],
    ['Init command', 'src/commands/init.mjs'],
    ['Status command', 'src/commands/status.mjs'],
  ];

  heading('🦈 SHARKOPS DOCTOR', 'SYSTEM SCAN');

  let breached = false;

  for (const [label, file] of checks) {
    if (exists(file)) {
      pass(label);
    } else {
      fail(`${label} (${file})`);
      breached = true;
    }
  }

  console.log();

  if (breached) {
    console.error(ui.red('GATE BREACH DETECTED'));
    process.exit(1);
  }

  console.log(ui.green('NO STRUCTURAL BREACH DETECTED'));
}
