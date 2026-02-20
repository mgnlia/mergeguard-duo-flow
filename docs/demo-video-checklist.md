# Demo Video Checklist — MergeGuard Duo Flow

Use this checklist to produce a clear 2–3 minute submission video.

## 1) Pre-recording setup
- [ ] Confirm app is live: https://mergeguard-duo-flow.vercel.app
- [ ] Close unrelated tabs/notifications.
- [ ] Browser zoom at 100% and readable font size.
- [ ] Prepare two MR sample inputs:
  - [ ] Low-risk sample (expected: `APPROVE WITH STANDARD GUARDS`)
  - [ ] High-risk sample (expected: `REVIEW REQUIRED` or `BLOCK`)
- [ ] Mic check (clear audio, no clipping).
- [ ] Record at 1080p if possible.

## 2) Suggested video outline (2–3 min)

### A. Problem + pitch (0:00–0:20)
- [ ] State problem: inconsistent/manual MR risk triage.
- [ ] One-line solution: dual-agent workflow that returns disposition + controls.

### B. Product walkthrough (0:20–1:40)
- [ ] Open live app homepage.
- [ ] Explain input fields briefly.
- [ ] Run **Sample 1 (low risk)**.
  - [ ] Call out Stage A triage result.
  - [ ] Call out Stage B controls and final disposition.
- [ ] Run **Sample 2 (high risk)**.
  - [ ] Highlight changed outcome (`REVIEW REQUIRED`/`BLOCK`).
  - [ ] Point to generated safeguards.

### C. Technical architecture (1:40–2:20)
- [ ] Show repository structure quickly:
  - [ ] `index.html`
  - [ ] `app.js`
  - [ ] `styles.css`
  - [ ] `docs/devpost-submission.md`
- [ ] Explain deterministic heuristic engine and why it is demo-stable.
- [ ] Note upgrade path: GitLab webhook ingest + model-backed agents.

### D. Close (2:20–2:40)
- [ ] Summarize impact: faster, more consistent MR decisions.
- [ ] Share repo + live demo URLs on screen.

## 3) Recording quality checklist
- [ ] Cursor movements are deliberate and not rushed.
- [ ] Text is legible at normal playback speed.
- [ ] No dead air longer than 3 seconds.
- [ ] Each step narrated with purpose.
- [ ] Final exported file plays without glitches.

## 4) Submission packaging checklist
- [ ] Upload final video (unlisted/public per submission rules).
- [ ] Verify video link opens without permissions issues.
- [ ] Add video URL to submission form.
- [ ] Cross-check with `docs/devpost-submission.md` copy.
- [ ] Final pass: project name, links, and wording consistency.
