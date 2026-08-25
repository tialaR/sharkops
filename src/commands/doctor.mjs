import { exists } from '../core/io.mjs';
import { isEngineRepository } from '../core/context.mjs';
import { heading, pass, fail, ui } from '../core/ui.mjs';

export function runDoctor() {
  const hostChecks = [
    ['package.json', 'package.json'],
    ['SharkOps config', '.sharkops/project.json'],
    ['SharkOps state', '.sharkops/state/current-state.json'],
    ['Bite ledger', '.sharkops/state/bite-ledger.json'],
  ];

  const engineChecks = [
    ['CLI', 'bin/sharkops.mjs'],
    ['Core IO', 'src/core/io.mjs'],
    ['Core UI', 'src/core/ui.mjs'],
    ['Init command', 'src/commands/init.mjs'],
    ['Status command', 'src/commands/status.mjs'],
    ['Doctor command', 'src/commands/doctor.mjs'],
    ['Verify command', 'src/commands/verify.mjs'],
  ];

  heading('🦈 SHARKOPS DOCTOR', 'SYSTEM SCAN');

  let breached = false;

  for (const [label, file] of hostChecks) {
    if (exists(file)) {
      pass(label);
    } else {
      fail(`${label} (${file})`);
      breached = true;
    }
  }

  if (isEngineRepository()) {
    for (const [label, file] of engineChecks) {
      if (exists(file)) {
        pass(label);
      } else {
        fail(`${label} (${file})`);
        breached = true;
      }
    }
  }

  console.log();

  if (breached) {
    console.error(ui.red('GATE BREACH DETECTED'));
    process.exit(1);
  }

  console.log(ui.green('NO STRUCTURAL BREACH DETECTED'));
}
