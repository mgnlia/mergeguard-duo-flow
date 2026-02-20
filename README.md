# MergeGuard Duo Flow (MVP)

Demo web MVP for GitLab AI Hackathon concept: a two-agent merge request risk review flow.

## What it does
- **Stage A (Fast Triage Agent):** parses MR title + diff summary and estimates risk severity.
- **Stage B (Risk & Policy Agent):** generates policy controls and a final merge disposition:
  - `BLOCK`
  - `REVIEW REQUIRED`
  - `APPROVE WITH STANDARD GUARDS`
- Outputs actionable next-step controls for reviewer workflows.

## Architecture
- Single-page frontend (no backend for MVP checkpoint)
  - `index.html`: UI layout for MR input and outputs
  - `app.js`: deterministic duo-agent simulation logic and policy engine
  - `styles.css`: dashboard styling
- Decision logic is heuristic and transparent (keyword/risk scoring), suitable for demo + judging walkthrough.

## Local setup
```bash
# any static server works
python -m http.server 8080
# then open http://localhost:8080
```

## Submission assets
- **Live demo:** https://mergeguard-duo-flow.vercel.app
- **Repository:** https://github.com/mgnlia/mergeguard-duo-flow
- **Devpost submission packet:** [`docs/devpost-submission.md`](docs/devpost-submission.md)
- **Demo video checklist:** [`docs/demo-video-checklist.md`](docs/demo-video-checklist.md)
- **Adversary evidence:** [`docs/adversary-evidence.md`](docs/adversary-evidence.md)
- **Closeout status / blockers:** [`docs/closeout-status.md`](docs/closeout-status.md)

## Rules-mapped feature checklist (GitLab AI Hackathon fit)
- [x] **AI-powered workflow concept**: dual-agent MR analysis path
- [x] **Developer productivity value**: reduces reviewer triage time with structured controls
- [x] **Working demo artifact**: interactive web MVP with decision card
- [x] **Clear use case narrative**: merge request risk and policy enforcement
- [x] **Extensible implementation path**: can swap heuristic engine for live model/API agents

## Immediate follow-on submission plan
1. Add real GitLab MR ingest (title/diff from webhook or pasted payload JSON).
2. Replace heuristic analyzer with model-backed agents and confidence scores.
3. Persist decision logs + reviewer feedback to tune policy thresholds.
4. Record 2-minute demo video and finalize Devpost narrative with architecture diagram.
