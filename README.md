# Personal Website

A personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features sections for about, experience, projects, and contact information with a dark and light theme toggle.

## Features

- About section with skills showcase
- Experience timeline
- Projects portfolio
- Contact information and social links
- Dark and light theme toggle
- Responsive design

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- React

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Resume PDF

The source is `public/Karan_Chawla_Resume.tex`; the site serves `public/Karan_Chawla_Resume.pdf`.

```bash
npm run resume:build
npm run resume:watch
```

`resume:build` compiles once. Run `resume:watch` in a separate terminal alongside `npm run dev` to rebuild after each save. A failed compilation leaves the previous PDF intact, and the watcher retries after the next edit. Auxiliary files are generated in a temporary directory and cleaned up automatically.

These commands require Node.js and either a local `latexmk`/TeX Live installation (including FiraSans and fontawesome5) or a running Docker daemon. If `latexmk` is missing, the script automatically uses a pinned TeX Live Docker image; the first build downloads a large image. Subsequent Docker compilations run without network access.

GitHub Actions runs the same compiler when the resume source or tooling is pushed to any branch, then commits the updated PDF back to that branch. It can also be run manually using the **Build resume PDF** workflow. PDF-only commits do not trigger another resume build. The workflow requires permission to write repository contents; branch protection rules may prevent its commit from being pushed. It never force-pushes: if the branch advances during compilation, rerun the workflow.

The website build remains unchanged, so Vercel does not need LaTeX. The updated PDF is available to deployments that include the generated commit. Pull that commit before continuing local work.

Verify the tooling with `npm run resume:test` and `npx eslint scripts/resume.mjs scripts/resume.test.mjs`.

## Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```
