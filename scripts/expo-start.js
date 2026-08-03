#!/usr/bin/env node

const { spawn } = require("child_process");

const existingOptions = process.env.NODE_OPTIONS ?? "";
if (!existingOptions.includes("--max-old-space-size")) {
  process.env.NODE_OPTIONS = `${existingOptions} --max-old-space-size=8192`.trim();
}

const child = spawn("npx", ["expo", "start", ...process.argv.slice(2)], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
