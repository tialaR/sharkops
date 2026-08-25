# SharkOps

SharkOps is an opinionated architecture recovery and project governance framework.

Its goal is simple:

**reduce technical decision load so developers can focus on product.**

SharkOps turns architectural decisions into repository-backed state, reversible change packages and executable verification.

## Core workflow

```text
IDENTIFY
   ↓
DECIDE
   ↓
ATTACK
   ↓
VERIFY
   ↓
REGISTER
   ↓
ROLLBACK
Current capabilities
initialize SharkOps inside an existing repository;
keep project state under .sharkops;
inspect project health with doctor;
verify the installed contract;
create reversible bites with apply, verify and rollback;
keep engine code separate from project-specific state.
CLI
sharkops init
sharkops status
sharkops doctor
sharkops verify
sharkops new SO-001 "Black Box"
Philosophy
No silent deviation.
No important architectural decision should live only in chat.
Validated rules should become executable contracts.
Reversible changes are preferred over irreversible edits.
Project-specific rules belong to the host project, not to the SharkOps engine.
Origin

SharkOps was created while hardening the architecture of a real production-style frontend application.

The original implementation grew inside the TDM Construtor project, where it was used to coordinate architectural recovery, executable gates, regression protection and reversible change waves.

This repository extracts the reusable engine from that real-world usage.

Status

0.1.0-alpha

Standalone core working:

init
status
doctor
verify
new

Portability has been verified against an external host repository.

License

MIT
