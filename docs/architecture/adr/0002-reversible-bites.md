
ADR 0002: Use reversible bites for controlled architectural change
Status

Accepted.

Context

Architectural recovery often involves changes with a larger blast radius than ordinary feature work.

When application, validation and recovery are distributed across manual steps, failures become harder to diagnose and rollback becomes an afterthought.

SharkOps needed a unit of change that carried implementation, verification and recovery together.

Alternatives considered
Apply changes directly and rely on Git rollback

Git remains the final source of history, but repository rollback alone does not document the intended recovery procedure or verification associated with a specific architectural change.

This was considered insufficient as the operating model.

Use one large migration script

A single script can move quickly, but it increases blast radius and makes partial failure harder to reason about.

It also encourages unrelated architectural decisions to travel together.

Require manual checklists

Checklists help execution discipline but cannot guarantee deterministic verification.

They were kept as supporting documentation, not as the primary control mechanism.

Decision

SharkOps models controlled architectural changes as reversible bites.

Each bite owns:

MANIFEST.json
apply.sh
verify.sh
rollback.sh
payload/
reports/

And exposes three explicit lifecycle operations:

apply
verify
rollback
Trade-offs

Bites introduce additional files and structure.

That overhead is justified only for changes where reversibility, traceability or regression protection materially reduce risk.

Small routine edits do not need to become bites.

Consequences
the intended change is inspectable before execution;
verification travels with the change;
rollback is designed before completion;
failures can be isolated to a smaller unit of work;
architectural recovery can progress incrementally instead of relying on one irreversible migration.
Why this decision matters

The model makes recovery part of the design rather than an emergency response.

The objective is not more ceremony.

It is controlled change with an explicit escape route.
