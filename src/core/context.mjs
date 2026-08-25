import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);

export function engineRoot() {
  return path.resolve(currentDir, '../..');
}

export function hostRoot() {
  return process.cwd();
}

export function isEngineRepository() {
  return hostRoot() === engineRoot();
}
