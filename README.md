# SharkOps

SharkOps is an opinionated architecture recovery and project governance framework.

Its goal is simple:

**Reduce technical decision load so developers can focus on product.**

SharkOps turns architectural decisions into repository-backed state, reversible change packages and executable verification.

## Core workflow

~~~text
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
~~~

## Why SharkOps exists

Architecture work often fails in one of two ways:

- important decisions live only in chat, tickets or memory;
- refactors move fast but regress silently because the rules are not executable.

SharkOps treats project knowledge as code.

It keeps operational state inside the repository, creates reversible change packages and verifies important contracts before they become invisible assumptions.

## Current capabilities

- initialize SharkOps inside an existing repository;
- keep project state under `.sharkops`;
- inspect project health with `doctor`;
- verify the installed contract;
- create reversible bites with `apply`, `verify` and `rollback`;
- keep engine code separate from project-specific state;
- verify package portability against a fresh external repository.

## Quick start

**Requirement:** Node.js 20 or newer.

Install the current alpha directly from GitHub:

~~~bash
npm install --save-dev github:tialaR/sharkops
~~~

Initialize SharkOps:

~~~bash
npx sharkops init
~~~

Inspect the repository:

~~~bash
npx sharkops status
npx sharkops doctor
npx sharkops verify
~~~

Create a reversible bite:

~~~bash
npx sharkops new SO-001 "Black Box"
~~~

This creates a structure similar to:

~~~text
.sharkops/
├── project.json
├── state/
│   ├── current-state.json
│   └── bite-ledger.json
└── bites/
    └── so-001-black-box/
        ├── MANIFEST.json
        ├── apply.sh
        ├── verify.sh
        ├── rollback.sh
        ├── payload/
        └── reports/
~~~

## Bites

A **bite** is a reversible change package.

Every bite starts with three explicit lifecycle operations:

~~~text
apply
verify
rollback
~~~

The goal is not to create more process.

The goal is to make risky architectural work explicit, inspectable and reversible.

## Engine vs host project

SharkOps separates the reusable engine from project-specific state:

~~~text
SharkOps engine
      ↓
generic CLI and verification logic

Host repository
      ↓
.sharkops/
project state, policies, bites and project-specific contracts
~~~

The engine does not need to absorb the host application's architecture.

Project-specific rules remain owned by the project where SharkOps is installed.

## Quality

The repository includes two executable verification layers:

~~~bash
node bin/sharkops.mjs verify
npm run test:smoke
~~~

The package smoke test:

1. creates the npm package;
2. installs it into a fresh temporary repository;
3. runs `init`;
4. runs `status`;
5. runs `doctor`;
6. runs `verify`.

Expected verdict:

~~~text
VERDICT: PORTABILITY VERIFIED
~~~

GitHub Actions runs the engine contract and portability gate on **Node.js 20 and 22** for pushes and pull requests to `main`.

## Philosophy

- No silent deviation.
- No important architectural decision should live only in chat.
- Validated rules should become executable contracts.
- Reversible changes are preferred over irreversible edits.
- Project-specific rules belong to the host project, not to the SharkOps engine.
- Tooling should reduce human decision load, not multiply it.

## Origin

SharkOps was created while hardening the architecture of a real production-style frontend application.

The original implementation grew inside **TDM Construtor**, where it coordinated architectural recovery, executable gates, regression protection and reversible change waves.

This repository extracts the reusable engine from that real-world usage instead of publishing the project-specific history of TDM.

## Status

**0.1.0-alpha**

Standalone core available:

- `init`
- `status`
- `doctor`
- `verify`
- `new`

Package portability is protected by an executable smoke test and CI.

## License

MIT
