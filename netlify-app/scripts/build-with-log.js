/**
 * Build wrapper: runs astro build and writes NDJSON logs for debugging.
 * Log path: set DEBUG_LOG_PATH or use default (workspace .cursor/debug.log).
 */
import { spawn } from 'child_process';
import { appendFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOG_PATH = process.env.DEBUG_LOG_PATH || join(__dirname, '..', '..', '..', '.cursor', 'debug.log');

function writeLog(payload) {
  const line = JSON.stringify({
    ...payload,
    timestamp: Date.now(),
    sessionId: 'debug-session',
    runId: process.env.DEBUG_RUN_ID || 'build-run',
  }) + '\n';
  try {
    appendFileSync(LOG_PATH, line);
  } catch (_) {}
}

// #region agent log
writeLog({
  location: 'build-with-log.js:start',
  message: 'Build script started',
  data: {
    hasSupabaseUrl: !!process.env.PUBLIC_SUPABASE_URL,
    hasSupabaseKey: !!process.env.PUBLIC_SUPABASE_ANON_KEY,
    nodeVersion: process.version,
    cwd: process.cwd(),
  },
  hypothesisId: 'H1',
});
// #endregion

const astro = spawn('npx', ['astro', 'build'], {
  cwd: join(__dirname, '..'),
  shell: true,
  stdio: ['ignore', 'pipe', 'pipe'],
});

let stdout = '';
let stderr = '';
astro.stdout?.on('data', (chunk) => { stdout += chunk.toString(); });
astro.stderr?.on('data', (chunk) => { stderr += chunk.toString(); });

astro.on('close', (code, signal) => {
  // #region agent log
  writeLog({
    location: 'build-with-log.js:exit',
    message: 'Build finished',
    data: {
      exitCode: code,
      signal: signal || null,
      stderrTail: stderr.slice(-3000),
      stdoutTail: stdout.slice(-1500),
    },
    hypothesisId: 'H2,H4,H5',
  });
  // #endregion
  process.exit(code ?? 1);
});

astro.on('error', (err) => {
  // #region agent log
  writeLog({
    location: 'build-with-log.js:spawn-error',
    message: 'Spawn error',
    data: { error: err.message },
    hypothesisId: 'H3,H5',
  });
  // #endregion
  process.exit(1);
});
