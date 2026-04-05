# Strings Algorithm Expansion Design Spec

**Date:** 2026-04-05
**Branch:** `feat/strings-expand-algorithms`
**Scope:** Expand from 1 to 38 string algorithms with 5 new VisualState kinds and tracker variants

## Problem

The strings category currently has only 1 algorithm (KMP Search) under a single technique (pattern-matching). All other categories have been expanded comprehensively (sorting: 54, stacks-queues: 28, arrays: 49, etc.). Strings needs equivalent coverage across multiple techniques.

## Solution Overview

Add 37 new string algorithms organized into 7 techniques, supported by 5 new VisualState kinds, 5 new tracker classes, and 5 new visualizer components.

## VisualState Architecture

### 1. `StringVisualState` (kind: `"string"`) — EXISTS
- **Fields:** textChars, patternChars, failureTable, patternOffset, textIndex, patternIndex, matchFound
- **Used by:** KMP Search, Naive Pattern Search, Rabin-Karp, Boyer-Moore, Z-Algorithm, Hamming Distance

### 2. `PalindromeVisualState` (kind: `"string-palindrome"`) — NEW
- **Fields:** chars (StringChar[]), leftPointer (number), rightPointer (number), centerIndex (number | null), expandRadius (number), isPalindrome (boolean | null), longestStart (number), longestLength (number)
- **Used by:** Palindrome Check, Valid Palindrome, Longest Palindromic Substring

### 3. `FrequencyVisualState` (kind: `"string-frequency"`) — NEW
- **Fields:** primaryChars (StringChar[]), secondaryChars (StringChar[]), frequencyMap (FrequencyEntry[]), windowStart (number), windowEnd (number), matchCount (number), resultIndices (number[])
- **FrequencyEntry:** { char: string, count: number, targetCount: number, state: "default" | "partial" | "satisfied" | "excess" }
- **Used by:** Valid Anagram, Group Anagrams, Find All Anagrams, First Non-Repeating Character, Longest Substring Without Repeating, Minimum Window Substring, Character Frequency Sort

### 4. `TransformVisualState` (kind: `"string-transform"`) — NEW
- **Fields:** inputChars (StringChar[]), outputChars (StringChar[]), readPointer (number), writePointer (number), phase (string), auxiliaryData (string | null)
- **Used by:** Reverse String, Reverse Words, String Compression, Run-Length Decoding, String to Integer, Roman to Integer, Integer to Roman, String Rotation Check, Longest Common Prefix

### 5. `TrieVisualState` (kind: `"string-trie"`) — NEW
- **Fields:** nodes (TrieNode[]), edges (TrieEdge[]), currentPath (number[]), searchWord (StringChar[]), highlightedNodes (number[]), matchResult (boolean | null), suggestions (string[])
- **TrieNode:** { id: number, char: string, isEnd: boolean, state: "default" | "current" | "matched" | "path" | "inserted" }
- **TrieEdge:** { from: number, to: number, char: string, state: "default" | "highlighted" | "traversed" }
- **Used by:** Trie Insert/Search, Trie Prefix Count, Longest Word in Trie, Auto-Complete, Aho-Corasick

### 6. `DistanceVisualState` (kind: `"string-distance"`) — NEW
- **Fields:** sourceChars (StringChar[]), targetChars (StringChar[]), matrix (DistanceCell[][]), currentRow (number), currentCol (number), operations (EditOperation[]), result (number | null)
- **DistanceCell:** { value: number, state: "default" | "computing" | "computed" | "path" | "current" }
- **EditOperation:** { type: "insert" | "delete" | "replace" | "match", sourceIdx: number, targetIdx: number }
- **Used by:** Levenshtein Distance, Jaro-Winkler, LCS, Longest Repeated Substring, Suffix Array, Wildcard Matching, Regex Matching, Longest Common Substring

## Algorithm List by Technique

### Pattern Matching (6 total: 1 existing + 5 new)

| # | Algorithm | Technique | Time | Space |
|---|-----------|-----------|------|-------|
| 1 | KMP Search (exists) | Failure table | O(n+m) | O(m) |
| 2 | Naive Pattern Search | Brute force | O(nm) | O(1) |
| 3 | Rabin-Karp Search | Rolling hash | O(n+m) avg | O(1) |
| 4 | Boyer-Moore Search | Bad char + good suffix | O(n/m) best | O(m+σ) |
| 5 | Z-Algorithm | Z-array | O(n+m) | O(n+m) |
| 6 | Hamming Distance | Positional comparison | O(n) | O(1) |

### Palindrome (3 new)

| # | Algorithm | Technique | Time | Space |
|---|-----------|-----------|------|-------|
| 7 | Palindrome Check | Two-pointer | O(n) | O(1) |
| 8 | Valid Palindrome | Filter + two-pointer | O(n) | O(1) |
| 9 | Longest Palindromic Substring | Expand around center | O(n²) | O(1) |

### Character Frequency (7 new)

| # | Algorithm | Technique | Time | Space |
|---|-----------|-----------|------|-------|
| 10 | Valid Anagram | Frequency counting | O(n) | O(1) |
| 11 | Group Anagrams | Sorted key hash | O(n·k·log k) | O(nk) |
| 12 | Find All Anagrams in String | Sliding window + freq | O(n) | O(1) |
| 13 | First Non-Repeating Character | Frequency scan | O(n) | O(1) |
| 14 | Longest Substring Without Repeating | Sliding window + set | O(n) | O(min(n,σ)) |
| 15 | Minimum Window Substring | Sliding window + freq | O(n+m) | O(σ) |
| 16 | Character Frequency Sort | Bucket sort | O(n) | O(n) |

### String Transformation (9 new)

| # | Algorithm | Technique | Time | Space |
|---|-----------|-----------|------|-------|
| 17 | Reverse String | Two-pointer swap | O(n) | O(1) |
| 18 | Reverse Words in String | Reverse all + each | O(n) | O(n) |
| 19 | String Compression | Run-length encoding | O(n) | O(n) |
| 20 | Run-Length Decoding | Expand encoding | O(output) | O(output) |
| 21 | String to Integer (atoi) | Parse + overflow | O(n) | O(1) |
| 22 | Roman to Integer | Symbol subtraction | O(n) | O(1) |
| 23 | Integer to Roman | Greedy decomposition | O(1) | O(1) |
| 24 | String Rotation Check | Concatenation | O(n) | O(n) |
| 25 | Longest Common Prefix | Vertical scanning | O(n·m) | O(1) |

### Trie Operations (5 new)

| # | Algorithm | Technique | Time | Space |
|---|-----------|-----------|------|-------|
| 26 | Trie Insert and Search | Trie traversal | O(m) | O(m) |
| 27 | Trie Prefix Count | Prefix tree counting | O(m) | O(nm) |
| 28 | Longest Word in Trie | DFS + trie | O(nm) | O(nm) |
| 29 | Auto-Complete with Trie | Prefix DFS | O(m+k) | O(nm) |
| 30 | Aho-Corasick Search | Trie automaton | O(n+m+z) | O(mk) |

### Edit Distance & Similarity (8 new)

| # | Algorithm | Technique | Time | Space |
|---|-----------|-----------|------|-------|
| 31 | Levenshtein Distance | DP matrix | O(nm) | O(nm) |
| 32 | Jaro-Winkler Similarity | Window matching | O(nm) | O(n) |
| 33 | Longest Common Subsequence | DP matrix | O(nm) | O(nm) |
| 34 | Longest Common Substring | DP matrix | O(nm) | O(nm) |
| 35 | Longest Repeated Substring | Suffix array + LCP | O(n log n) | O(n) |
| 36 | Suffix Array Construction | Sort suffixes | O(n log²n) | O(n) |
| 37 | Wildcard Matching | DP table | O(nm) | O(nm) |
| 38 | Regular Expression Matching | DP table | O(nm) | O(nm) |

## Tracker Classes

### PalindromeTracker (`src/trackers/palindrome-tracker.ts`)
Methods: initialize, setPointers, compareChars, charsMatch, charsMismatch, expandCenter, markPalindrome, updateLongest, skipNonAlphanumeric, complete

### FrequencyTracker (`src/trackers/frequency-tracker.ts`)
Methods: initialize, addToFrequency, removeFromFrequency, expandWindow, shrinkWindow, checkAnagram, markSatisfied, markNonRepeating, addToResult, complete

### TransformTracker (`src/trackers/transform-tracker.ts`)
Methods: initialize, readChar, writeChar, swapChars, advancePointers, setPhase, appendOutput, markConverted, complete

### TrieTracker (`src/trackers/trie-tracker.ts`)
Methods: initialize, createNode, traverseEdge, insertChar, markEndOfWord, searchChar, matchFound, addSuggestion, buildFailureLinks, complete

### DistanceTracker (`src/trackers/distance-tracker.ts`)
Methods: initialize, computeCell, fillBaseCase, compareChars, recordOperation, tracePath, updateResult, complete

## Visualizer Components

Each new VisualState kind requires a corresponding React visualizer component:

1. `PalindromeVisualizer` — Renders string with animated left/right pointers, center expansion arcs
2. `FrequencyVisualizer` — Renders string(s) with sliding window markers + frequency histogram
3. `TransformVisualizer` — Renders input/output strings side by side with transformation arrows
4. `TrieVisualizer` — Renders trie as tree diagram with highlighted paths and edge labels
5. `DistanceVisualizer` — Renders DP matrix grid with string headers and traced path

## File Structure Per Algorithm

```
src/algorithms/strings/<technique>/<algorithm>/
├── index.ts                           # Registry definition (~50 lines)
├── step-generator.ts                  # Step generation (~80-200 lines)
├── educational.ts                     # Educational content (~60 lines)
├── <algorithm>.test.ts                # Correctness tests (~50 lines)
├── step-generator.test.ts            # Step generation tests (~60 lines)
├── <Algorithm>Pipeline.stories.tsx    # Storybook story (~50 lines)
└── sources/
    ├── <algorithm>.ts                 # TypeScript source (~40 lines)
    ├── <algorithm>.py                 # Python source (~35 lines)
    └── <Algorithm>.java               # Java source (~45 lines)
```

## E2E & CI Updates

### E2E Inputs (`e2e/helpers/inputs.ts`)
Add input test handlers for all 37 new algorithms with appropriate test data.

### E2E Spec (`e2e/specs/algorithms/strings.spec.ts`)
No changes needed — dynamic discovery picks up new algorithms automatically.

### CI Shards (`.github/workflows/ci.yml` and `.github/workflows/deploy.yml`)
Update unit test and e2e shard counts in both CI and deploy workflows based on final test counts. Both files have independent shard matrices that must be kept in sync.

## Implementation Phases (Sequential)

### Phase 1: Types & Infrastructure
- Add 5 new VisualState interfaces to `src/types/execution.ts`
- Update `VisualState` discriminated union
- Export new types from `src/types/index.ts`
- Add new StepType values for new operations

### Phase 2: Trackers
- Implement 5 new tracker classes extending BaseTracker
- Export from `src/trackers/index.ts`

### Phase 3: Visualizer Components
- Implement 5 new visualizer components
- Register in visualization switcher component

### Phase 4: Pattern Matching Algorithms (5 new)
- Implement each algorithm with all 9 files
- Uses existing StringTracker

### Phase 5: Palindrome Algorithms (3 new)
- Implement each algorithm with all 9 files
- Uses PalindromeTracker

### Phase 6: Character Frequency Algorithms (7 new)
- Implement each algorithm with all 9 files
- Uses FrequencyTracker

### Phase 7: String Transformation Algorithms (9 new)
- Implement each algorithm with all 9 files
- Uses TransformTracker

### Phase 8: Trie Operations (5 new)
- Implement each algorithm with all 9 files
- Uses TrieTracker

### Phase 9: Edit Distance & Similarity (8 new)
- Implement each algorithm with all 9 files
- Uses DistanceTracker

### Phase 10: Barrel & Integration Updates
- Update `fn-import.d.ts` with 37 new function declarations
- Update `e2e/helpers/inputs.ts` with test data for all algorithms
- Verify auto-discovery glob pattern covers all nested paths

### Phase 11: Code Review
- code-reviewer agent reviews all implementations
- Fix any issues found

### Phase 12: QA Testing
- qa-tester agent runs all tests
- Validates no regressions in existing code

### Phase 13: MCP Browser Preview
- Open browser and navigate all new algorithms
- Verify visualizations render correctly
- Fix any visual issues

### Phase 14: Quality Gate & CI Update
- Run: lint → format → typecheck → vitest → e2e
- Update shard counts in both `.github/workflows/ci.yml` and `.github/workflows/deploy.yml` based on total test numbers
- Fix any failures

## Model Assignment

| Phase | Model | Rationale |
|-------|-------|-----------|
| Planning & Architecture | Opus | Complex design decisions |
| Type definitions & trackers | Sonnet | Implementation code |
| Visualizer components | Sonnet | React component code |
| Algorithm implementation | Sonnet | Bulk implementation |
| Code review | Opus | Quality assessment |
| QA testing | Opus | Test analysis |
| Quality gate fixes | Sonnet | Bug fixes |

## Quality Rules

- No files over 500 lines — split into modules if needed
- No TypeScript `any` — use `unknown` with narrowing or proper types
- Code comments required for file purpose and significant blocks
- Fix typecheck issues, missing imports, name conflicts immediately
- All lint, typecheck, prettier, vitest, e2e deferred to final quality gate
