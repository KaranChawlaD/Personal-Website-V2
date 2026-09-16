import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { buildResume, watchResume } from "./resume.mjs";

const basename = "Karan_Chawla_Resume";

function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), "resume-test-"));
  writeFileSync(join(directory, `${basename}.tex`), "source");
  writeFileSync(join(directory, `${basename}.pdf`), "original PDF");
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  return directory;
}

test("publishes successful compilation and cleans auxiliary files", (t) => {
  const directory = fixture(t);
  let output;
  buildResume({ directory, run(command, args, options) {
    assert.equal(command, "latexmk");
    assert.equal(options.cwd, directory);
    assert.ok(args.includes("-no-shell-escape"));
    assert.ok(args.includes("-norc"));
    output = args.find((arg) => arg.startsWith("-outdir=")).slice(8);
    writeFileSync(join(output, `${basename}.pdf`), "new PDF");
    writeFileSync(join(output, `${basename}.aux`), "auxiliary data");
    return { status: 0 };
  } });
  assert.equal(readFileSync(join(directory, `${basename}.pdf`), "utf8"), "new PDF");
  assert.deepEqual(readdirSync(directory).sort(), [`${basename}.pdf`, `${basename}.tex`]);
  assert.throws(() => readdirSync(output), { code: "ENOENT" });
});

test("failed compilation preserves the existing PDF and cleans temporary output", (t) => {
  const directory = fixture(t);
  let output;
  assert.throws(() => buildResume({ directory, run(command, args) {
    assert.equal(command, "latexmk");
    output = args.find((arg) => arg.startsWith("-outdir=")).slice(8);
    writeFileSync(join(output, `${basename}.pdf`), "incomplete PDF");
    return { status: 1 };
  } }), /compilation failed/);
  assert.equal(readFileSync(join(directory, `${basename}.pdf`), "utf8"), "original PDF");
  assert.throws(() => readdirSync(output), { code: "ENOENT" });
});

test("falls back to an isolated Docker compiler when latexmk is missing", (t) => {
  const directory = fixture(t);
  const commands = [];
  buildResume({ directory, run(command, args) {
    commands.push(command);
    if (command === "latexmk") return { error: { code: "ENOENT" } };
    assert.ok(args.includes("--network=none"));
    assert.ok(args.includes(`type=bind,source=${directory},target=/source,readonly`));
    assert.ok(args.includes("ghcr.io/xu-cheng/texlive-full:20250301"));
    const mount = args.find((arg) => arg.endsWith("target=/output"));
    const output = mount.slice("type=bind,source=".length, -",target=/output".length);
    writeFileSync(join(output, `${basename}.pdf`), "Docker PDF");
    return { status: 0 };
  } });
  assert.deepEqual(commands, ["latexmk", "docker"]);
  assert.equal(readFileSync(join(directory, `${basename}.pdf`), "utf8"), "Docker PDF");
});

test("reports missing compilers without replacing the PDF", (t) => {
  const directory = fixture(t);
  assert.throws(() => buildResume({ directory, run: () => ({ error: { code: "ENOENT" } }) }), /Install latexmk/);
  assert.equal(readFileSync(join(directory, `${basename}.pdf`), "utf8"), "original PDF");
});

test("watch mode builds immediately and recovers on the next source edit", async (t) => {
  const directory = fixture(t);
  let builds = 0;
  let resolveRebuild;
  const rebuilt = new Promise((resolve) => { resolveRebuild = resolve; });
  const stop = watchResume({ directory, interval: 20, compile() {
    builds++;
    if (builds === 1) throw new Error("Invalid LaTeX");
    resolveRebuild();
  } });
  t.after(stop);
  assert.equal(builds, 1);
  await new Promise((resolve) => setTimeout(resolve, 60));
  writeFileSync(join(directory, `${basename}.tex`), "updated source");
  let timeout;
  try {
    await Promise.race([
      rebuilt,
      new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error("Watcher did not rebuild")), 3000); }),
    ]);
  } finally {
    clearTimeout(timeout);
  }
  assert.ok(builds >= 2);
});
