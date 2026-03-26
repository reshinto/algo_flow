---
name: implementation-planning
description: Plan implementation phases for new features or algorithms following the project's phased milestone approach
user-invocable: true
---

# Implementation Planning

## Task

Create a structured implementation plan for a new feature or algorithm addition.

## Instructions

1. **Identify scope**: Determine which phase(s) of the project this change affects
2. **Check dependencies**: Verify required types, trackers, and components exist
3. **Plan file changes**: List every file that needs creation or modification
4. **Define test strategy**: Specify what unit tests, stories, and e2e tests are needed
5. **Estimate impact**: Note which existing components are affected

## Plan Template

```
### Feature: [name]
### Phase: [phase number]

#### Files to Create
- [ ] path/to/file.ts - description

#### Files to Modify
- [ ] path/to/file.ts - what changes

#### Tests Required
- [ ] Unit: description
- [ ] Story: description
- [ ] E2E: description (if applicable)

#### Dependencies
- Requires: [list existing modules needed]
- Blocks: [list what this unblocks]
```
