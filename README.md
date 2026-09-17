# 🦈 SharkOps

<p align="center">
  <strong>Architecture recovery and project governance through repository-backed state, reversible bite scaffolding and executable structural verification.</strong>
</p>

<p align="center">
  Turn technical decisions into visible project state, controlled change packages and checks that actually run.
</p>

---

## Flow at a glance

<p align="center">
  <img src="./docs/readme/assets/sharkops-flow-overview.svg" alt="SharkOps flow at a glance showing init, new, verify, status, plus the bite lifecycle scripts and repository-backed state." width="960" />
</p>

SharkOps `0.1.0-alpha` keeps the surface intentionally small and explicit: initialize the repository, record project state, create a reversible bite skeleton, inspect the current state, run structural diagnostics and verify the installed SharkOps contract.

## Current alpha scope

What is implemented today:

- a standalone Node.js CLI;
- `init`, `status`, `doctor`, `verify` and `new`;
- repository-owned state under `.sharkops/`;
- a bite ledger and current-state file;
- reversible bite scaffolding with `MANIFEST.json`, `apply.sh`, `verify.sh` and `rollback.sh`;
- structural verification of the installed SharkOps contract;
- package portability verification in a fresh external repository;
- CI on Node.js 20 and 22.

What is **not** implemented as a first-class CLI capability yet:

- `sharkops apply`;
- `sharkops rollback`;
- automatic execution of generated bite lifecycle scripts;
- dynamic loading and execution of rich project-specific architectural policies;
- automatic progression of project state based on bite execution.

Those are directions the architecture can grow into, not capabilities this alpha claims to ship.

## Why SharkOps exists

Architecture rarely breaks because a team has no rules.

It breaks because important decisions gradually become scattered across chats, tickets, documentation and memory, while refactors keep moving underneath them.

SharkOps approaches that problem by keeping operational state close to the code and making the recovery workflow explicit.

The longer-term operating model is:

```text
decision
   ↓
repository-backed state
   ↓
reversible bite
   ↓
verification
   ↓
registered result
```

The goal is simple:

> **Reduce technical decision load so developers can focus on product.**

SharkOps is intentionally opinionated, but the alpha does not pretend to automate every architectural decision. It provides a small engine and a repository-backed structure on top of which stronger project-specific contracts can be built.

## The workflow

The conceptual workflow is:

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
```

This is the **operating model**, not a one-to-one list of CLI commands.

Today, `sharkops new` creates a bite skeleton containing three explicit lifecycle scripts:

```text
apply.sh
verify.sh
rollback.sh
```

In `0.1.0-alpha`, these scripts are project-owned scaffolds. SharkOps creates them, marks the bite as reversible and records it in the ledger, but does not yet expose `apply` or `rollback` as first-class CLI commands or automatically execute those scripts.

## CLI

<p align="center">
  <img src="./docs/readme/assets/sharkops-doctor-cli.png" alt="SharkOps doctor command validating the CLI structure" width="760" />
</p>

The current CLI surface is deliberately small:

<p align="center">
  <img src="./docs/readme/assets/sharkops-new-bite-cli.png" alt="SharkOps creating a new reversible bite" width="620" />
</p>

```bash
sharkops init
sharkops status
sharkops doctor
sharkops verify
sharkops new
```

### `init`

Creates the `.sharkops/` project structure, initial state and empty bite ledger without modifying existing project contracts.

### `status`

Reads and displays the current recorded SharkOps state from `.sharkops/state/current-state.json`.

### `doctor`

Checks whether the expected SharkOps files and structure are present. Inside the SharkOps engine repository, it also checks the engine's own command/core files.

### `verify`

Verifies the installed SharkOps structural contract: required files, package bin wiring, project engine identity and bite-ledger shape.

It does **not** yet behave as a general-purpose project architecture rule engine.

### `new`

Creates a reversible bite skeleton, records it in the bite ledger and generates `apply.sh`, `verify.sh` and `rollback.sh` placeholders ready for project-specific implementation.

## Quick start

**Requirement:** Node.js 20 or newer.

Install the current alpha directly from GitHub:

```bash
npm install --save-dev github:tialaR/sharkops
```

Initialize it inside a repository:

```bash
npx sharkops init
```

Inspect the recorded state and installation:

```bash
npx sharkops status
npx sharkops doctor
npx sharkops verify
```

Create a bite:

```bash
npx sharkops new SO-001 "Black Box"
```

SharkOps creates project-owned state similar to:

```text
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
```

The generated lifecycle scripts are intentionally minimal scaffolds in the current alpha. Their payload, verification and rollback logic must be implemented by the host project.

## Engine and host project stay separate

SharkOps deliberately separates reusable tooling from the architecture of the repository using it.

```text
SharkOps engine
      │
      ├── CLI
      ├── generic commands
      └── structural verification
             │
             ▼
Host repository
      │
      └── .sharkops/
            ├── project state
            ├── bite ledger
            ├── reversible bite scaffolds
            └── future/project-owned contracts
```

The engine does not need to understand the application's internal architecture.

The host project remains the owner of its own rules.

This boundary keeps SharkOps portable while leaving room for each repository to grow stronger project-specific contracts without coupling them to the engine.

**[Architecture →](./docs/ARCHITECTURE.md)**

## Executable governance

SharkOps is designed around a direction: important engineering decisions should move closer to repository-backed state and executable verification instead of living only in memory, chat or prose.

The current alpha already proves the infrastructure for that direction through:

- repository-owned state;
- bite scaffolding;
- structural contract verification;
- package portability testing;
- CI execution.

Richer rules such as dependency boundaries, migration policies, ownership constraints or other project-specific architectural checks are **not provided as a generic rule engine in this alpha**. They remain a direction for host-owned contracts and future evolution.

> **No silent deviation** is the design principle, not a claim that every possible rule is automatically enforced today.

## Portability is tested

The repository includes a package-level smoke test:

```bash
npm run test:smoke
```

The test packages SharkOps, installs it into a fresh temporary repository and exercises the standalone workflow:

```text
package
   ↓
external repository
   ↓
init
   ↓
status
   ↓
doctor
   ↓
verify
```

Expected verdict:

```text
VERDICT: PORTABILITY VERIFIED
```

GitHub Actions executes the engine contract and portability verification on **Node.js 20 and 22** for pushes and pull requests to `main`.

## Architecture decisions

The repository keeps architectural decisions close to the implementation rather than leaving their rationale implicit.

* [ADR 0001 — Engine / host-project boundary](./docs/architecture/adr/0001-engine-host-boundary.md)
* [ADR 0002 — Reversible bites](./docs/architecture/adr/0002-reversible-bites.md)

See also:

* [Architecture](./docs/ARCHITECTURE.md)
* [SharkOps workflow](./docs/sharkops/SHARKOPS.md)

## What SharkOps proves today

For a recruiter or engineering reviewer, the repository demonstrates:

- a real standalone CLI with five implemented commands;
- repository-backed operational state;
- reversible change scaffolding with an explicit recovery path;
- clear separation between reusable tooling and host-project state;
- executable structural verification;
- package portability verified outside the source repository;
- CI on multiple Node.js versions;
- architecture decisions documented with rationale and trade-offs.

It does **not** claim that the current alpha already automates the full lifecycle of architectural change.

The value is making that lifecycle more explicit, inspectable and easier to evolve into stronger executable contracts.

## Philosophy

* **No silent deviation.**
* Important architectural decisions should not live only in memory or conversation history.
* Rules worth protecting should move toward executable contracts when practical.
* Recovery should be designed alongside risky change.
* Project-specific rules belong to the host repository.
* Tooling should reduce human decision load, not create another job.
* Architecture governance should help product development move with more confidence, not less.

## Where it came from

SharkOps was not designed as an abstract architecture exercise.

It emerged while hardening **TDM Construtor**, a production-style frontend product where architectural recovery required controlled refactors, regression protection, explicit state and repeatable verification.

The workflow evolved there through real engineering constraints.

This standalone repository extracts the reusable mechanism without carrying TDM's project-specific history or architecture into the package.

That distinction is intentional:

```text
real project pressure
        ↓
working engineering practice
        ↓
generic extraction
        ↓
SharkOps
```

## Current status

**`0.1.0-alpha`**

Available now:

* `init`
* `status`
* `doctor`
* `verify`
* `new`
* repository-backed state
* bite ledger
* reversible bite scaffolding
* structural engine/installation verification
* external package portability smoke test
* CI on Node.js 20 and 22

Still evolving:

* first-class execution commands for bite lifecycle operations;
* richer host-project architectural contracts;
* automatic state progression and lifecycle orchestration.

The alpha scope is deliberately small: prove the CLI, repository boundary, state model and portability before expanding the surface area.

## Repository structure

```text
bin/                         CLI entrypoint
src/commands/                command implementations
src/core/                    shared engine primitives
.sharkops/                   SharkOps state for this repository
scripts/                     package verification
docs/                        architecture and workflow documentation
.github/workflows/           continuous verification
```

## License

MIT

---

<p align="center">
  <strong>🦈 SharkOps</strong><br />
  Reversible bites · repository-backed state · executable verification
</p>

<p align="center">
  Created by <strong>Tiala Rocha</strong>
</p>
