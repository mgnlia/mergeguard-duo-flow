# Devpost Submission Packet — MergeGuard Duo Flow

> Working title: **MergeGuard Duo Flow**
> 
> Repo: https://github.com/mgnlia/mergeguard-duo-flow  
> Live demo: https://mergeguard-duo-flow.vercel.app

## 1) One-line pitch
MergeGuard Duo Flow uses a two-agent AI review workflow to triage merge request risk, enforce policy controls, and produce a clear merge disposition before human approval.

## 2) Problem
Code reviewers lose time on repetitive triage and inconsistent risk decisions, especially when high-impact changes are mixed into normal merge request volume. Teams need fast, structured guidance that highlights risky changes early and standardizes required safeguards.

## 3) Solution
MergeGuard Duo Flow introduces a simple dual-agent decision path:

- **Stage A — Fast Triage Agent**: parses MR title + diff summary and assigns initial risk severity.
- **Stage B — Risk & Policy Agent**: converts that risk into concrete controls and final disposition:
  - `BLOCK`
  - `REVIEW REQUIRED`
  - `APPROVE WITH STANDARD GUARDS`

The output is actionable by design: reviewers get a disposition and a checklist of immediate controls.

## 4) Why this is useful to developers
- Reduces reviewer context-switching overhead.
- Creates consistent policy recommendations for similar classes of changes.
- Improves auditability by making decision logic transparent and explainable.
- Provides an extensible foundation for model-backed MR analysis.

## 5) Demo scope (MVP)
Current MVP is a deterministic, browser-based simulation designed for judging walkthroughs:

- Single-page UI for MR input and outputs.
- Transparent heuristic scoring (keywords/risk signals).
- Deterministic policy-control generation.
- Final merge recommendation card.

## 6) Architecture summary
- **Frontend only (MVP)**
  - `index.html` — input/output dashboard layout
  - `app.js` — duo-agent simulation and policy engine
  - `styles.css` — visual styling
- No backend required for current demo checkpoint.

## 7) AI/hackathon fit
- AI-assisted workflow concept with multi-agent structure.
- Direct productivity value for software teams.
- Working, interactive demo artifact.
- Clear path to real GitLab integration and model upgrades.

## 8) How to run locally
```bash
python -m http.server 8080
# open http://localhost:8080
```

## 9) Planned productionization path
1. Ingest live GitLab MR metadata (title, files changed, diff excerpts).
2. Replace heuristic stage logic with model-backed agents + confidence scores.
3. Persist decisions and reviewer feedback for threshold tuning.
4. Add policy templates by repository/service tier.
5. Add webhook-driven review comments/status checks.

## 10) Suggested Devpost field text (copy-ready)

### Project Name
MergeGuard Duo Flow

### Tagline
Two-agent AI merge request triage for fast, consistent risk decisions.

### What it does
MergeGuard Duo Flow analyzes merge request intent and diff summary through two AI-style stages: a fast triage stage and a policy stage. It outputs a risk-aware merge disposition (`BLOCK`, `REVIEW REQUIRED`, or `APPROVE WITH STANDARD GUARDS`) plus concrete controls reviewers should apply.

### How we built it
We built a deterministic MVP web app that simulates a dual-agent code review workflow. The first stage detects risk signals from MR text. The second stage maps risk to policy controls and a final recommendation. The current version emphasizes explainability and fast demoability while preserving a clean upgrade path to live model inference and GitLab webhook ingestion.

### Challenges we ran into
- Balancing transparency vs. sophistication in an MVP timeframe.
- Designing controls that are concrete enough to be useful in review workflows.
- Keeping outputs stable and reproducible for demo judging.

### Accomplishments we’re proud of
- End-to-end interactive demo shipped and deployed.
- Clear dual-agent architecture and decision boundaries.
- Structured output that’s immediately actionable for reviewers.

### What we learned
- Review tooling benefits from deterministic guardrails first, then model depth.
- Explainable policy mapping improves trust in AI-assisted recommendations.
- A staged-agent pattern maps naturally to MR workflows.

### What’s next
- Real GitLab integration (webhooks/API).
- Model-backed analysis with confidence + rationale.
- Decision history, team feedback loop, and policy tuning UI.

## 11) Submission assets checklist
- [x] Public GitHub repository
- [x] Live deployed demo URL
- [x] README with setup + feature checklist
- [x] Devpost submission packet draft (this document)
- [ ] Demo video recording and upload
- [ ] Final Devpost form submission
