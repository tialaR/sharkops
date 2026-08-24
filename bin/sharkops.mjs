#!/usr/bin/env node

import { heading, ui } from '../src/core/ui.mjs';
import { runInit } from '../src/commands/init.mjs';
import { runStatus } from '../src/commands/status.mjs';
import { runDoctor } from '../src/commands/doctor.mjs';
import { runVerify } from '../src/commands/verify.mjs';
import { runNew } from '../src/commands/new-bite.mjs';

const command = process.argv[2];

function showHelp() {
  heading('🦈 SHARKOPS', 'ATTACK CONTROL');

  console.log(`${ui.white('Commands')}\n`);
  console.log('  sharkops init      Initialize SharkOps in a repository');
  console.log('  sharkops status    Show current project state');
  console.log('  sharkops doctor    Check SharkOps structure');
  console.log('  sharkops verify    Verify the installed contract');
  console.log('  sharkops new       Create a new reversible bite');

  console.log(
    `\n${ui.muted('No silent deviation. Every approved rule becomes a gate.')}\n`
  );
}

if (!command || command === '--help' || command === '-h') {
  showHelp();
  process.exit(0);
}

if (command === 'init') {
  runInit();
  process.exit(0);
}

if (command === 'status') {
  runStatus();
  process.exit(0);
}

if (command === 'doctor') {
  runDoctor();
  process.exit(0);
}

if (command === 'verify') {
  runVerify();
  process.exit(0);
}

if (command === 'new') {
  runNew(process.argv.slice(3));
  process.exit(0);
}

console.error(ui.red(`Unknown command: ${command}`));
process.exit(1);
