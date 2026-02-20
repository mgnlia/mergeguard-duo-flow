const analyzeBtn = document.getElementById('analyze');
const titleEl = document.getElementById('title');
const diffEl = document.getElementById('diff');
const criticalityEl = document.getElementById('criticality');
const triageEl = document.getElementById('triage');
const riskEl = document.getElementById('risk');
const decisionEl = document.getElementById('decision');
const nextStepsEl = document.getElementById('nextSteps');

function containsAny(text, patterns) {
  return patterns.some((p) => text.includes(p));
}

function runDuoFlow({ title, diff, criticality }) {
  const t = `${title}\n${diff}`.toLowerCase();

  const flags = {
    auth: containsAny(t, ['auth', 'oauth', 'token', 'session', 'password']),
    sql: containsAny(t, ['sql', 'query', 'database', 'migration']),
    secrets: containsAny(t, ['secret', 'api_key', 'private key', '.env']),
    permissions: containsAny(t, ['role', 'permission', 'acl', 'admin']),
    ci: containsAny(t, ['pipeline', 'ci', '.gitlab-ci', 'deploy']),
    testGap: !containsAny(t, ['test', 'spec', 'coverage'])
  };

  let triageScore = 0;
  if (flags.auth) triageScore += 2;
  if (flags.sql) triageScore += 2;
  if (flags.secrets) triageScore += 3;
  if (flags.permissions) triageScore += 2;
  if (flags.ci) triageScore += 1;
  if (flags.testGap) triageScore += 1;
  if (criticality === 'high') triageScore += 2;
  if (criticality === 'medium') triageScore += 1;

  const triageSeverity = triageScore >= 7 ? 'high' : triageScore >= 4 ? 'medium' : 'low';

  const triageSummary = [
    `MR title: ${title || '(untitled)'}`,
    `Estimated severity: ${triageSeverity.toUpperCase()} (score ${triageScore})`,
    `Detected areas: ${Object.entries(flags).filter(([,v]) => v).map(([k]) => k).join(', ') || 'none'}`,
    `Action: ${triageSeverity === 'high' ? 'Mandatory deep policy review.' : 'Proceed to policy checks with standard depth.'}`
  ].join('\n');

  const controls = [];
  if (flags.auth) controls.push('Validate auth boundary checks and token lifetimes');
  if (flags.permissions) controls.push('Run permission matrix regression for non-admin users');
  if (flags.sql) controls.push('Check query parameterization and migration rollback plan');
  if (flags.secrets) controls.push('Scan for hard-coded secrets and rotate exposed keys');
  if (flags.ci) controls.push('Require protected branch + pipeline pass before merge');
  if (flags.testGap) controls.push('Block until automated tests are added for changed paths');
  if (!controls.length) controls.push('No high-risk controls triggered; standard reviewer approval path');

  const block = flags.secrets || (flags.auth && flags.testGap) || (criticality === 'high' && triageSeverity === 'high');
  const warn = !block && (triageSeverity === 'high' || flags.testGap || flags.permissions);

  const decision = block ? 'BLOCK' : warn ? 'REVIEW REQUIRED' : 'APPROVE WITH STANDARD GUARDS';

  return {
    triageSummary,
    riskSummary: [
      'Policy checks:',
      ...controls.map((c, i) => `${i + 1}. ${c}`),
      `Final policy disposition: ${decision}`
    ].join('\n'),
    decision,
    controls
  };
}

analyzeBtn.addEventListener('click', () => {
  const payload = {
    title: titleEl.value.trim(),
    diff: diffEl.value.trim(),
    criticality: criticalityEl.value
  };

  if (!payload.title && !payload.diff) {
    triageEl.textContent = 'Please provide a title or diff summary.';
    riskEl.textContent = 'Waiting for valid input...';
    decisionEl.textContent = 'No decision yet.';
    decisionEl.className = 'decision neutral';
    nextStepsEl.innerHTML = '';
    return;
  }

  const out = runDuoFlow(payload);
  triageEl.textContent = out.triageSummary;
  riskEl.textContent = out.riskSummary;

  decisionEl.textContent = out.decision;
  decisionEl.className = 'decision ' + (out.decision === 'BLOCK' ? 'block' : out.decision === 'REVIEW REQUIRED' ? 'warn' : 'approve');

  nextStepsEl.innerHTML = out.controls.map((c) => `<li>${c}</li>`).join('');
});
