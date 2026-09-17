# Architecture

SharkOps is intentionally split between a reusable engine and project-owned state.

The goal is to keep the tool portable without forcing every repository to adopt the same internal architecture.

## Responsibilities

### SharkOps engine

The standalone package owns:

- CLI entrypoints;
- generic commands;
- reusable verification infrastructure;
- project initialization;
- bite scaffolding.

```text
bin/
  sharkops.mjs

src/
  commands/
  core/
```

### Host repository

The repository using SharkOps owns:

```text
.sharkops/
  project.json
  state/
  bites/
  project-specific contracts
```

Project-specific architecture stays with the project.

SharkOps provides the mechanism for expressing and verifying those decisions, not the decisions themselves.

## Why this boundary exists

SharkOps originated inside a real application.

Keeping the original project rules inside the reusable package would have made the tool easier to extract initially, but harder to reuse anywhere else.

That would couple the engine to assumptions that only made sense for one codebase.

The chosen boundary keeps:

- generic behavior in the engine;
- project knowledge in the host repository;
- verification close to the rules it protects.

## Alternatives considered

### Put every architectural rule inside the engine

Rejected because the engine would need to understand each application's folder structure, dependencies and conventions.

That would reduce portability and turn project evolution into engine maintenance.

### Keep SharkOps only as scripts copied between repositories

Rejected because duplicated scripts drift quickly and make fixes difficult to propagate.

A reusable engine provides a stable execution layer while host projects retain their own contracts.

### Keep decisions only in documentation

Rejected because documentation explains intent but cannot detect silent regression.

SharkOps treats documentation and executable verification as complementary.

## Execution model

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

A bite supports three explicit lifecycle operations:

```text
apply
verify
rollback
```

## Trade-offs

This model introduces some repository structure and process.

That cost is accepted where it buys:

- explicit recovery paths;
- reproducible verification;
- traceable architectural decisions;
- reduced dependency on human memory.

SharkOps should not create gates for every preference.

The intended threshold is simple:

> if a rule is important enough that silently breaking it would create meaningful risk, it may deserve an executable contract.

## Design principle

The architecture favors explicit state, executable contracts and reversible changes over undocumented conventions.

The engine stays generic.

The host project stays responsible for its own architecture.
