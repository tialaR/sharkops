
ADR 0002: Use reversible bites for controlled architectural change
Status

Accepted.

Context

Large architectural changes are risky when application, validation and recovery are implicit or distributed across manual steps.

Decision

SharkOps models controlled changes as reversible bites.

A bite exposes three explicit lifecycle operations:

apply
verify
rollback

Each bite also owns its manifest, payload and reports.

Consequences

Changes become inspectable before execution.

Verification is associated with the change that introduced it.

Recovery is designed before the change is considered complete.

The workflow adds structure only where that structure reduces technical risk and decision load.
