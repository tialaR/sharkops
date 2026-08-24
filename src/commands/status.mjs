import { readJson } from '../core/io.mjs';
import { heading, row, ui } from '../core/ui.mjs';

export function runStatus() {
  const project = readJson('.sharkops/project.json');
  const state = readJson('.sharkops/state/current-state.json');

  heading('🦈 SHARKOPS STATUS', 'TARGET ACQUIRED');

  row('Project:', project.productName || project.project);
  row('Phase:', state.phase);
  row('Last bite:', state.lastBite);
  row('Next bite:', state.nextBite);
  row('Architecture:', state.architecture);
  row('Knowledge:', state.knowledge);
  row('Updated:', state.updatedAt);

  console.log(
    `\n${ui.muted('Attack posture: controlled. No silent deviation authorized.')}\n`
  );
}
