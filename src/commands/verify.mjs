import { exists, readJson } from '../core/io.mjs';
import { isEngineRepository } from '../core/context.mjs';
import { heading, pass, fail, ui } from '../core/ui.mjs';

export function runVerify() {
  heading('🦈 SHARKOPS VERIFY', 'BITE INSPECTION');

  const hostFiles = [
    'package.json',
    '.sharkops/project.json',
    '.sharkops/state/current-state.json',
    '.sharkops/state/bite-ledger.json',
  ];

  const engineFiles = [
    'bin/sharkops.mjs',
    'src/core/io.mjs',
    'src/core/ui.mjs',
    'src/core/context.mjs',
    'src/commands/init.mjs',
    'src/commands/status.mjs',
    'src/commands/doctor.mjs',
    'src/commands/verify.mjs',
    'src/commands/new-bite.mjs',
  ];

  let breached = false;

  for (const file of hostFiles) {
    if (exists(file)) {
      pass(file);
    } else {
      fail(file);
      breached = true;
    }
  }

  if (isEngineRepository()) {
    for (const file of engineFiles) {
      if (exists(file)) {
        pass(file);
      } else {
        fail(file);
        breached = true;
      }
    }

    const pkg = readJson('package.json');

    if (pkg.bin?.sharkops === './bin/sharkops.mjs') {
      pass('package bin sharkops');
    } else {
      fail('package bin sharkops');
      breached = true;
    }
  }

  const project = readJson('.sharkops/project.json');

  if (project.engine === 'SharkOps') {
    pass('project engine SharkOps');
  } else {
    fail('project engine SharkOps');
    breached = true;
  }

  const ledger = readJson('.sharkops/state/bite-ledger.json');

  if (ledger.schemaVersion === 1 && Array.isArray(ledger.bites)) {
    pass('bite ledger contract');
  } else {
    fail('bite ledger contract');
    breached = true;
  }

  console.log();

  if (breached) {
    console.error(ui.red('VERDICT: UNSAFE'));
    process.exit(1);
  }

  console.log(ui.green('VERDICT: NO REGRESSION DETECTED'));
}
