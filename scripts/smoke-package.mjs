import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'sharkops-smoke-'));

function run(command, args, cwd = root) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: 'pipe'
  });

  if (result.status !== 0) {
    console.error(result.stdout);
    console.error(result.stderr);
    process.exit(result.status ?? 1);
  }

  return result.stdout;
}

console.log('PACKAGE  building');
const packOutput = run('npm', ['pack', '--silent']).trim();
const tarball = path.join(root, packOutput);

try {
  run('npm', ['init', '-y'], temp);
  run('npm', ['install', tarball], temp);

  const cli = path.join(temp, 'node_modules', '.bin', 'sharkops');

  run(cli, ['init'], temp);
  run(cli, ['status'], temp);
  run(cli, ['doctor'], temp);

  const verify = run(cli, ['verify'], temp);

  if (!verify.includes('VERDICT: NO REGRESSION DETECTED')) {
    console.error('BREACH package smoke verification did not reach green verdict');
    process.exit(1);
  }

  console.log('PASS  package installation');
  console.log('PASS  init');
  console.log('PASS  status');
  console.log('PASS  doctor');
  console.log('PASS  verify');
  console.log('VERDICT: PORTABILITY VERIFIED');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
  fs.rmSync(tarball, { force: true });
}
