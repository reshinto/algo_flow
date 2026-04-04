# Root Level Files Guide

This guide provides a detailed overview of the files located at the root level of the project. It is specifically designed for developers and contributors who are new to this codebase. By understanding the purpose of each file—what it is, why it's there, when it's used, where it operates, and how to use it—you will be able to confidently modify, create, or delete root-level configurations as needed.

_Note: This guide ignores root directories (like `/src` or `/node_modules`) and focuses exclusively on system, configuration, and structural fles at the root level._

---

## 1. Version Control & Environment Setup

### `.gitignore`

- **What:** A text file containing rules and patterns.
- **Why:** To tell Git which files or directories should not be tracked by version control (e.g., `node_modules/`, `.env` files, build outputs). This prevents repository bloat and accidental commits of sensitive data.
- **When:** Evaluated automatically by Git every time checking status, adding files, or committing.
- **Where:** Git configuration layer.
- **How (Creation/Modification/Deletion):** Modify this file to add new log files, build artifacts, or operating-system-specific files (like `.DS_Store`) that you never want committed.

### `.githooks/pre-commit`

- **What:** A shell script that runs automatically before every `git commit`.
- **Why:** Enforces code quality locally — runs Prettier, ESLint with `--fix`, and TypeScript type-checking before a commit is created, then re-stages any files that were auto-fixed. This catches issues before they reach CI.
- **When:** Invoked by Git immediately before a commit is finalized.
- **Where:** Git hook layer (activated by `git config core.hooksPath .githooks`).
- **How (Creation/Modification/Deletion):** Run `git config core.hooksPath .githooks` once after cloning to activate. Edit the script only to add new pre-commit checks. If you need to bypass the hook in an emergency, use `git commit --no-verify` (not recommended).

### `.env.example`

- **What:** A template for environment variables used by the application.
- **Why:** To safely illustrate which environment variables the application requires to run without committing actual secret keys or API tokens into source control.
- **When:** Used during the initial project setup or when bringing up a fresh environment.
- **Where:** Local environment configuration.
- **How (Creation/Modification/Deletion):** A new developer should copy this to a new file named `.env` and fill out the values. If you add a new environment variable requirement to the application, you must add a placeholder for it here.

---

## 2. Package Management & Runtimes

### `package.json`

- **What:** The central metadata and configuration file for any Node.js project.
- **Why:** It defines the project name, version, runnable scripts (like `dev`, `build`, `test`), and lists all external dependencies the project requires.
- **When:** Used constantly. It is read during installation, when running tasks, and by bundling tools.
- **Where:** Node.js package environment.
- **How (Creation/Modification/Deletion):** You rarely modify the dependencies manually; instead, you run `npm install <package>`. You modify this manually when adding new custom `scripts` to automate development tasks. This file **must not** be deleted.

### `package-lock.json`

- **What:** An exact, strict dependency tree generated.
- **Why:** It locks the exact versions of all installed packages (including nested dependencies) to guarantee 100% reproducible builds across all developer machines and CI environments.
- **When:** Automatically created or updated whenever npm installs or updates a package.
- **Where:** Node.js package environment.
- **How (Creation/Modification/Deletion):** Never edit this file manually. It is managed entirely by npm. If caching issues arise, you can delete it and run `npm install` to regenerate it.

### `.nvmrc`

- **What:** A text file containing a Node.js version number string (e.g., `20.10.0`).
- **Why:** Ensures that everyone working on the project uses the exact same Node.js runtime version, preventing "works on my machine" bugs.
- **When:** Used immediately when setting up terminal sessions or entering the project folder.
- **Where:** Read by NVM (Node Version Manager) or Volta.
- **How (Creation/Modification/Deletion):** If you run Node via NVM, typing `nvm use` will read this file and switch versions. Change this string when the project is officially migrating to a newer Node.js version.

### `.npmrc`

- **What:** Local configuration settings for the npm package manager.
- **Why:** To enforce specific installation behaviors (like overriding registry URLs, ensuring legacy peer dependencies, or suppressing warnings) specific to this project.
- **When:** Automatically parsed whenever an `npm` command runs.
- **Where:** npm execution layer.
- **How (Creation/Modification/Deletion):** Edit this if you need to add organization-specific private package registries or if you're fixing global peer-dependency conflicts.

---

## 3. Build Tools & Transpilation

### `vite.config.ts`

- **What:** The central configuration file for Vite (the frontend build tool and development server).
- **Why:** Defines how your frontend code is served locally, how it resolves modules, what plugins are enabled, and how it bundles files for production.
- **When:** Read every time you start the app (`npm run dev`) or build it (`npm run build`).
- **Where:** Build and compilation pipeline.
- **How (Creation/Modification/Deletion):** Modify this file to add path aliases, new Vite plugins (like React or Vue integrations), or to configure an API proxy for local development.

### `vite-plugin-fn-import.ts`

- **What:** A heavily customized Vite plugin written specifically for this codebase.
- **Why:** It intercepts files being imported with a `?fn` suffix (e.g., `import { func } from "./my-algo.ts?fn"`). It strips out visual comment markers, transpiles TypeScript to raw JavaScript implicitly, and auto-exports functions.
- **When:** Evaluated continually as files are requested by the browser during local dev or bundled during a build.
- **Where:** Inside the Vite compilation pipeline.
- **How (Creation/Modification/Deletion):** Modify this if the way algorithms are dynamically loaded needs to change, or if a new language or file handling method must be supported. Only touch if you grok Vite Plugin APIs.

### `tsconfig.json`

- **What:** The root configuration for TypeScript.
- **Why:** In modern setups, this root file often just acts as an anchor that references other specialized TypeScript configs (using `references`), allowing separate linting rules for frontend UI files versus backend node scripts.
- **When:** Parsed by the TypeScript compiler (`tsc`) and your code editor (VS Code, Cursor) continuously.
- **Where:** Editor and compiler.
- **How (Creation/Modification/Deletion):** Modify to add new environment-specific tsconfig references.

### `tsconfig.app.json`

- **What:** The TypeScript configuration tailored explicitly for your frontend application code (DOM APIs).
- **Why:** Tells the compiler how strictly it should evaluate your frontend code and allows usage of DOM-specific library types (like `window` and `document`).
- **When:** While writing and compiling frontend source files inside `src/`.
- **Where:** Editor and compiler.
- **How (Creation/Modification/Deletion):** Edit to adjust type-checking strictness (e.g., `strictNullChecks`), JSX support, or path aliases.

### `tsconfig.node.json`

- **What:** The TypeScript configuration tailored for scripts running in the Node.js environment (like Vite configs directly).
- **Why:** Node.js execution environments differ from browser ones; this config avoids injecting DOM types here and ensures modern Node execution compatibility.
- **When:** When compiling build scripts outside the main `/src` application window.
- **Where:** Editor and compiler.
- **How (Creation/Modification/Deletion):** Edit if your build scripts require access to newly supported Node runtime features.

### `tsconfig.e2e.json`

- **What:** A TypeScript configuration targeting the `e2e/` directory specifically.
- **Why:** E2E spec files use `@playwright/test` types and DOM + ESNext module conventions that differ from the main app config. This config is referenced by `e2e/tsconfig.json` (which extends it) to give editors full type coverage over the spec and helper files.
- **When:** Parsed by the TypeScript compiler when type-checking E2E files and by editors navigating `e2e/` sources.
- **Where:** Editor and compiler (E2E scope only).
- **How (Creation/Modification/Deletion):** Edit if Playwright types or E2E-specific lib targets change.

### `index.html`

- **What:** The absolute entry point for the frontend web application.
- **Why:** When users navigate to your deployed app or local server, this is the very first file sent. It typically loads the root Vite JavaScript file.
- **When:** Loaded instantly on initial page hit.
- **Where:** Client-side (DOM).
- **How (Creation/Modification/Deletion):** Modify to add external scripts (e.g., analytics), custom web fonts, meta tags for SEO/social cards, or the root `<div id="app">` container.

---

## 4. Linting & Code Formatting

### `eslint.config.js`

- **What:** The flat configuration file for ESLint (the standard JavaScript/TypeScript linter).
- **Why:** Enforces coding standards, catches bugs before runtime, and forces consistent logical patterns across a completely unopinionated team.
- **When:** Continually parsing inside your code editor, and manually triggered via linting scripts (`npm run lint`).
- **Where:** Editor language server / CI pipeline.
- **How (Creation/Modification/Deletion):** Add plugins here (e.g., if you introduce a new framework or need accessibility linting) and toggle individual code rules directly.

### `.prettierrc`

- **What:** Formatting configuration for Prettier.
- **Why:** Automates the styling of code (tabs vs spaces, single vs double quotes, trailing commas) ignoring logic entirely to ensure code layout looks identical regardless of author.
- **When:** Typically runs automatically on "save" in the editor.
- **Where:** Editor / CI pipeline.
- **How (Creation/Modification/Deletion):** Edit this file to debate spaces vs tabs.

### `.prettierignore`

- **What:** A list telling Prettier which files to skip.
- **Why:** Running Prettier on enormous auto-generated bundles or legacy unformatted files wastes CPU time and corrupts formatting algorithms. `*.md` is currently excluded so that documentation files are not auto-reformatted by the pre-commit hook.
- **When:** Anytime Prettier tries to format.
- **Where:** Editor runtime.
- **How (Creation/Modification/Deletion):** Add a path here when a file should absolutely not be automatically styled correctly (rare).

---

## 5. Deployment, Containerization & CI/CD

### `Dockerfile`

- **What:** A set of infrastructure-as-code instructions defining how to build a Docker Image.
- **Why:** Guarantees that the application will launch in the exact same pristine, isolated OS environment in production as it did locally.
- **When:** Used when preparing to deploy, test, or share the fully constructed system.
- **Where:** Docker build engine.
- **How (Creation/Modification/Deletion):** Edit to change base node versions, inject build steps, or install system-level packages inside your final production container.

### `docker-compose.yml`

- **What:** A multi-container orchestration configuration.
- **Why:** Allows developers to spin up multiple linked services simultaneously with a single command (e.g., staring the UI, a database, and an API all together).
- **When:** Used when running `docker-compose up`.
- **Where:** Local Docker runtime network setup.
- **How (Creation/Modification/Deletion):** Modify this to add dependent mock services (like a local fake Redis instances), or change local port bindings.

### `.dockerignore`

- **What:** Excludes files and patterns from entering the Docker build process context.
- **Why:** Prevents large, useless folders (like `node_modules` or `.git`) from being shipped to the Docker daemon, significantly speeding up build times and securing image hygiene.
- **When:** Run automatically at the very start of a `docker build`.
- **Where:** Docker CLI interface.
- **How (Creation/Modification/Deletion):** Keep this matching your `.gitignore` very strictly. Modify to ignore developer-only artifacts.

### `chromatic.config.json`

- **What:** Setup configuration for Chromatic (usually paired with Storybook).
- **Why:** Used to manage visual regression testing, allowing teams to catch visual differences automatically directly within Pull Requests mapping against UI components.
- **When:** Read during CI/CD steps pushing Storybook components into Chromatic.
- **Where:** CI Cloud integration.
- **How (Creation/Modification/Deletion):** Edit to change Chromatic project settings, adjust timeout limits, or manipulate story execution bounds.

---

## 6. General Documentation

### `README.md`

- **What:** The main landing page document for the application.
- **Why:** It gives humans context. It acts as the face of the repository, providing instructions for setup, contributing, and basic execution flows.
- **When:** The first file any developer looks at when landing on the GitHub repository.
- **Where:** Root of repository.
- **How (Creation/Modification/Deletion):** Modify this to keep architecture overviews and installation instructions up to date. Deleting this is generally a cardinal sin for open source and team collaboration.
