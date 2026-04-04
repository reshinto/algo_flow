---
name: security-coverage-audit
description: Run security checks (OWASP client-side) and verify test coverage thresholds (80/75/80/80) with Playwright E2E validation
user-invocable: true
---

# Security & Coverage Audit

## Task

Run a combined security and test coverage audit to verify the project meets quality and safety thresholds.

## Steps

### 1. Coverage Verification

- Run `npm run test -- --coverage`
- Verify thresholds: Statements 80%, Branches 75%, Functions 80%, Lines 80%
- Identify any files below thresholds
- Check that new algorithms have both correctness tests and step generation tests

### 2. E2E Test Validation

- Run `npm run e2e` (dev server starts automatically via hooks)
- Verify per-category spec files in `e2e/specs/` auto-discover new algorithms (confirm import in `src/algorithms/index.ts`)
- Confirm 3-viewport coverage: desktop (1280px), tablet (768px), mobile (375px)
- Check that algorithms with custom input editors have entries in `e2e/specs/input-editors.spec.ts`

### 3. OWASP Client-Side Security

- Run `npm audit` and report vulnerabilities
- Scan for `eval()`, `Function()`, `innerHTML` usage: `grep -r "eval\|innerHTML\|Function(" src/`
- Verify no `dangerouslySetInnerHTML` in components
- Check Monaco editor configuration: read-only by default, no script execution
- Verify input editors sanitize values before `generateSteps()` calls
- Confirm no inline event handlers with string code

### 4. CSP Compliance

- No inline `<script>` tags in `index.html`
- No `unsafe-eval` or `unsafe-inline` in Content Security Policy
- External resources loaded with integrity hashes where possible

### 5. Dependency Security

- Check `package-lock.json` for known vulnerabilities
- Flag any dependency with critical or high severity
- Verify no unnecessary runtime dependencies (dev deps not in production bundle)

### 6. Test Quality Analysis

- **Edge case gaps**: Identify missing edge case tests (empty inputs, boundary values, error conditions)
- **Test quality scoring**: Evaluate tests beyond coverage % — are assertions meaningful? Do tests verify behavior or just structure?
- **Critical path coverage**: Ensure the most important execution paths (algorithm correctness, step generation, playback flow) have thorough test coverage
- **Mutation resistance**: Would the tests catch a subtle bug (e.g., off-by-one, wrong comparison operator)?

## Rules

- Do not suppress security findings without documenting the exception
- Coverage below thresholds is a blocker — do not approve without justification
- Security findings at high/critical severity are blockers

## Output Format

- PASS: [area] - details
- FAIL: [area] - details + remediation steps
- BLOCKED: [finding] - must resolve before merge
