import { spawnSync } from "node:child_process";
import { copyFileSync, mkdtempSync, rmSync, watchFile, unwatchFile } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));
const basename = "Karan_Chawla_Resume";
const image = "ghcr.io/xu-cheng/texlive-full:20250301";
const flags = ["-norc", "-pdf", "-file-line-error", "-halt-on-error", "-interaction=nonstopmode", "-no-shell-escape"];

export function buildResume({ directory = publicDirectory, run = spawnSync } = {}) {
  const output = mkdtempSync(join(tmpdir(), "resume-"));
  try {
    let result = run("latexmk", [...flags, `-outdir=${output}`, `${basename}.tex`], {
      cwd: directory,
      stdio: "inherit",
    });
    if (result.error?.code === "ENOENT") {
      console.log("[resume] latexmk not found; using the TeX Live Docker image.");
      result = run("docker", [
        "run", "--rm", "--network=none",
        ...(process.getuid ? ["--user", `${process.getuid()}:${process.getgid()}`] : []),
        "--mount", `type=bind,source=${directory},target=/source,readonly`,
        "--mount", `type=bind,source=${output},target=/output`,
        "--workdir", "/source", image,
        "latexmk", ...flags, "-outdir=/output", `${basename}.tex`,
      ], { stdio: "inherit" });
    }
    if (result.error) {
      throw new Error("Install latexmk with TeX Live (including FiraSans and fontawesome5), or install and start Docker.", { cause: result.error });
    }
    if (result.status !== 0) {
      throw new Error("Resume compilation failed. The existing PDF has not been changed.");
    }
    copyFileSync(join(output, `${basename}.pdf`), join(directory, `${basename}.pdf`));
    console.log(`[resume] Updated public/${basename}.pdf`);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
}

export function watchResume({ directory = publicDirectory, compile = buildResume, interval = 500 } = {}) {
  const source = join(directory, `${basename}.tex`);
  const rebuild = () => {
    try {
      compile({ directory });
    } catch (error) {
      console.error(`[resume] ${error.message}`);
    }
  };
  watchFile(source, { interval }, rebuild);
  rebuild();
  console.log(`[resume] Watching ${source}. Press Ctrl+C to stop.`);
  return () => unwatchFile(source, rebuild);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === "--watch") {
    const stop = watchResume();
    process.once("SIGINT", stop);
    process.once("SIGTERM", stop);
  } else if (args.length === 0) {
    try {
      buildResume();
    } catch (error) {
      console.error(`[resume] ${error.message}`);
      process.exitCode = 1;
    }
  } else {
    console.error("Usage: node scripts/resume.mjs [--watch]");
    process.exitCode = 1;
  }
}
