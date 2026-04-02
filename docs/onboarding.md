[← Back to README](../README.md)

# New Developer Onboarding Guide

Welcome to AlgoFlow! If you're a new developer staring at this repository for the first time, it can feel overwhelmingly large. This document serves as the absolute starting point—your map to understanding how to navigate the codebase, what boundaries exist, and the explicit sequence of documents you should read to gain full operational context.

## 1. High-Level Mental Model

AlgoFlow is an interactive algorithm visualizer. It does not just run code; it statically analyzes raw strings of code, injects them into an embedded code editor (Monaco), executes that code deterministically to pre-compute an array of "States", and then allows users to scrub backward and forward through that array like a YouTube video playback timeline.

Because of this specific requirement to "time-travel" backward smoothly, we do **not** run the visual updates in real-time. Everything is pre-computed eagerly the moment the user clicks play.

## 2. The Strict Domain Boundary

The single most important architectural rule in AlgoFlow is the rigid boundary between **execution logic** and the **UI shell**.

- **`src/components/` (The Application Shell)**
  If your task is to add a new rendering algorithm (e.g., Quick Sort), **you should never touch these files.** The visualization logic, sidebar rendering, and playback generic controls are entirely decoupled from what an algorithm actually does.
- **`src/algorithms/` & `src/trackers/` (Your Workspace)**
  This is where raw algorithm files live. Algorithms employ "Inversion of Control". They self-register themselves into a central data dictionary (`src/registry`). The UI shell dynamically queries this dictionary to build its DOM. By dropping a self-registering file into `src/algorithms`, you automatically hook into the entire application without needing to edit complex React routing trees.

## 3. The Required Reading Sequence

To become proficient in the underlying systems, you should digest the existing documentation conceptually in this exact order:

### Document 1: `docs/architecture.md`

- **Why read it:** It deeply maps out the data flow from algorithm definition all the way to `Zustand` global states. Crucially, it explains the major design decisions (like using Pre-computed Steps over JS Generators) and openly admits to our current system constraints (like Main-Thread blocking bottlenecks).
- **Goal:** Realize how an algorithm tells the React view layer to change its layout.

### Document 2: `docs/root-files-guide.md`

- **Why read it:** Before you start spinning up dependencies, this guide explains exactly what configuration tooling dictates your local setup. It clearly explains `.npmrc`, Vite build limits (`vite.config.ts`), and the specific role of `vite-plugin-fn-import.ts` which enables our raw code parser.
- **Goal:** Understand the build pipeline that transforms static text into visual graphs.

### Document 3: `docs/contributing.md`

- **Why read it:** This is the execution manual. Now that you understand the "Why" and the "Where", this document provides the exact "How". It maps out the rigorous command-line quality gates, branching strategies, and provides an immaculate 6-step tutorial for constructing a new implementation from scratch using our `BaseTracker` systems.
- **Goal:** Become capable of shipping a functional, test-driven PR.

## 4. Final Words

Consistency is critical. The codebase actively opposes "machine-generated nonsense". If you are adding code documentation, `JSDoc` comments, or new markdown files: avoid abstract generalizations (like `// gets the array elements`). Describe exactly **why** the logic behaves the way it does in terms of edge-cases, mechanical tradeoffs, and the specific application constraints.
