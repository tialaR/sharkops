
ADR 0001: Separate the SharkOps engine from host-project state
Status

Accepted.

Context

SharkOps originated inside a real application and accumulated project-specific history, state and verification rules.

Publishing that internal implementation directly would couple the reusable tool to one application's architecture.

Decision

The standalone SharkOps package contains only generic CLI and engine behavior.

Project-specific state remains inside the repository where SharkOps is installed under .sharkops.

Consequences

The engine stays portable.

Each host project retains ownership of its own architectural rules.

New project contracts can evolve without requiring the generic SharkOps engine to understand the host application's architecture.
