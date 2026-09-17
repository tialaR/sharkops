# SharkOps Workflow

SharkOps is an architecture recovery and project governance workflow.

Its purpose is to make important technical decisions explicit, executable and recoverable.

## Lifecycle

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

## Commands

```bash
sharkops init
sharkops status
sharkops doctor
sharkops verify
sharkops new
```

## Bites

A bite is a reversible unit of change.

Each generated bite contains lifecycle scripts and isolated working areas for payloads and reports.

```text
MANIFEST.json
apply.sh
verify.sh
rollback.sh
payload/
reports/
```

## Principle

> **No silent deviation.**

Important architectural decisions should not survive only as memory, chat history or informal convention.

Once a rule is approved and worth protecting, SharkOps favors turning it into repository-backed state or an executable gate.
