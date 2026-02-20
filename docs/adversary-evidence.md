# Adversary Review Evidence — MergeGuard Duo Flow

Date: 2026-02-20  
Repo: https://github.com/mgnlia/mergeguard-duo-flow  
Live: https://mergeguard-duo-flow.vercel.app

## Objective
Stress the deterministic two-agent MR triage flow with adversarial and edge-case inputs to verify that:
1. Unsafe/high-risk signals are not silently approved.
2. Missing evidence (e.g., no tests) increases safeguards.
3. The UI fails safely on empty input.

## Test matrix

### Case A — Empty input safety
- **Input**: title empty, diff empty
- **Expected**: no decision; prompt for valid input
- **Observed**: `Please provide a title or diff summary.` and neutral decision state
- **Result**: PASS

### Case B — Secret leakage attempt
- **Input title**: `hotfix: temporary api_key patch`
- **Input diff summary**: `added fallback token in code path`
- **Expected**: high-risk controls + BLOCK
- **Observed**: `Scan for hard-coded secrets...` and `Final policy disposition: BLOCK`
- **Result**: PASS

### Case C — Auth change without tests
- **Input title**: `refactor auth session handling`
- **Input diff summary**: `adjust token lifetime and middleware`
- **Expected**: controls requiring auth checks and tests; non-approve disposition
- **Observed**: auth + test-gap controls, `Final policy disposition: BLOCK` (due auth + test gap)
- **Result**: PASS

### Case D — Permission-sensitive change
- **Input title**: `admin role ACL updates`
- **Input diff summary**: `permission matrix adjusted`
- **Expected**: review controls and non-silent approval
- **Observed**: permission regression control and `REVIEW REQUIRED`
- **Result**: PASS

### Case E — Low-risk documented change
- **Input title**: `docs: add README examples`
- **Input diff summary**: `no runtime code, includes tests/spec references`
- **Expected**: standard guards path
- **Observed**: `APPROVE WITH STANDARD GUARDS`
- **Result**: PASS

## Conclusion
The current MVP behavior remains conservative under adversarial inputs and applies stronger controls when risk signals are present.

**adversary:pass**
