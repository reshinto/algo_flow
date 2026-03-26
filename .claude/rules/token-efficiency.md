## Token Efficiency Rules

### General

- Prefer the most token-efficient path that does not reduce quality
- Do not repeat requirements back unnecessarily
- Use subagents only when useful, keep them tightly scoped
- Centralize reused strings and metadata to avoid duplication

### Code Generation

- Avoid generating boilerplate that can be inferred
- Use barrel exports to reduce import verbosity
- Prefer composition over inheritance to minimize class hierarchies
- Keep component files focused - one component per file

### Communication

- Be concise in commit messages and PR descriptions
- Skip filler words and unnecessary transitions
- Lead with the answer or action, not the reasoning
