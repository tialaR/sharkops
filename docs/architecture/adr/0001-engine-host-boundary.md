
ADR 0001: Separate the SharkOps engine from host-project state
Status

Accepted.

Context

SharkOps originated inside a real application and accumulated project-specific history, state and verification rules.

Publishing that implementation directly would make extraction fast, but it would couple the standalone package to one application's architecture.

The reusable tool needs to support repositories with different structures and policies without understanding each codebase internally.

Alternatives considered
Keep project-specific rules inside the SharkOps package

This would centralize everything in one place.

It was rejected because every new host architecture would increase engine complexity and create coupling between unrelated projects.

Copy SharkOps scripts directly into each repository

This would maximize local ownership.

It was rejected because duplicated engine logic would drift and make fixes or improvements difficult to propagate consistently.

Decision

The standalone SharkOps package contains generic CLI and engine behavior.

Project-specific state, policies, bites and executable contracts remain inside the host repository under .sharkops.

Trade-offs

The boundary means SharkOps cannot automatically understand every host project's architecture.

That is intentional.

The host repository must explicitly define the rules it wants to protect.

In exchange, the engine remains portable and reusable.

Consequences
the engine can evolve independently of host-project architecture;
each repository retains ownership of its own rules;
project contracts stay close to the code they protect;
new host projects do not require SharkOps engine changes unless they need new generic capabilities.
Why this decision matters

The goal is not to create a universal architecture policy.

The goal is to provide reusable infrastructure for projects to make their own important decisions explicit and executable.
