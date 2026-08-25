# Architecture

SharkOps is split into two responsibilities:

1. the reusable engine;
2. project-specific state installed inside the host repository.

The engine owns generic CLI behavior and verification logic.

The host repository owns its own `.sharkops` state, policies, bites and executable contracts.

## Structure

```text
bin/
  sharkops.mjs

src/
  commands/
  core/

.sharkops/
  project.json
  state/
  bites/
Core boundary

SharkOps does not absorb the architecture of the project where it is installed.

Project-specific rules stay in the host repository.

The engine remains portable and reusable.

Execution model
decision
   ↓
state
   ↓
reversible bite
   ↓
verification
   ↓
registered result

A bite is expected to support:

apply
verify
rollback

The architecture favors explicit state, executable contracts and reversible changes over undocumented conventions.
