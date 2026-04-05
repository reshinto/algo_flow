/** Step generator for Rabin-Karp Search — produces ExecutionStep[] using StringTracker. */

import type { ExecutionStep } from "@/types";
import { StringTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const RABIN_KARP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.RABIN_KARP_SEARCH!);

const HASH_BASE = 31;
const HASH_PRIME = 1_000_000_007;

export interface RabinKarpSearchInput {
  text: string;
  pattern: string;
}

export function generateRabinKarpSearchSteps(input: RabinKarpSearchInput): ExecutionStep[] {
  const { text, pattern } = input;
  const tracker = new StringTracker(text, pattern, RABIN_KARP_LINE_MAP);

  // Phase 1: Compute initial hashes
  tracker.initialize({ text, pattern });

  if (pattern.length === 0) {
    tracker.recordMatch(0, { matchStart: 0 });
    tracker.complete({ result: 0 });
    return tracker.getSteps();
  }

  if (pattern.length > text.length) {
    tracker.complete({ result: -1 });
    return tracker.getSteps();
  }

  const patternLen = pattern.length;
  const textLen = text.length;

  // Compute base^(patternLen-1) % prime
  let highPow = 1;
  for (let powIdx = 0; powIdx < patternLen - 1; powIdx++) {
    highPow = (highPow * HASH_BASE) % HASH_PRIME;
  }

  // Compute initial pattern hash and first window hash, using computingFailureEntry
  // to display hash-building progress in the failure table visualizer
  let patternHash = 0;
  let windowHash = 0;
  for (let charIdx = 0; charIdx < patternLen; charIdx++) {
    patternHash = (patternHash * HASH_BASE + pattern.charCodeAt(charIdx)) % HASH_PRIME;
    windowHash = (windowHash * HASH_BASE + text.charCodeAt(charIdx)) % HASH_PRIME;
    // Emit a step for each character hashed into the initial window
    tracker.computingFailureEntry(charIdx, {
      charIdx,
      patternHash,
      windowHash,
      phase: "computing-initial-hash",
    });
    tracker.setFailureEntry(charIdx, Math.floor(patternHash % 1000), {
      charIdx,
      patternHash,
      windowHash,
    });
  }

  // Phase 2: Search — slide window across text
  tracker.startSearch({ text, pattern, patternHash, windowHash });

  for (let windowStart = 0; windowStart <= textLen - patternLen; windowStart++) {
    // Show current window being evaluated
    tracker.compareChars(windowStart, 0, windowStart, {
      windowStart,
      windowHash,
      patternHash,
      hashesMatch: windowHash === patternHash,
    });

    if (windowHash === patternHash) {
      // Hashes match — verify character by character to eliminate false positives
      let charIdx = 0;
      let allCharsMatch = true;

      while (charIdx < patternLen) {
        tracker.compareChars(windowStart + charIdx, charIdx, windowStart, {
          windowStart,
          charIdx,
          textChar: text[windowStart + charIdx],
          patternChar: pattern[charIdx],
          verifyingAfterHashMatch: true,
        });

        if (text[windowStart + charIdx] === pattern[charIdx]) {
          tracker.charMatch(windowStart + charIdx, charIdx, {
            windowStart,
            charIdx,
          });
          charIdx++;
        } else {
          tracker.charMismatch(windowStart + charIdx, charIdx, {
            windowStart,
            charIdx,
            note: "hash-collision",
          });
          allCharsMatch = false;
          break;
        }
      }

      if (allCharsMatch && charIdx === patternLen) {
        tracker.recordMatch(windowStart, { matchStart: windowStart });
        tracker.complete({ result: windowStart });
        return tracker.getSteps();
      }
    } else {
      // Hashes differ — skip this window without character comparison
      tracker.charMismatch(windowStart, 0, {
        windowStart,
        windowHash,
        patternHash,
        note: "hash-mismatch-skip",
      });
    }

    // Roll the hash: remove outgoing char, add incoming char
    if (windowStart < textLen - patternLen) {
      const outgoingCharCode = text.charCodeAt(windowStart);
      const incomingCharCode = text.charCodeAt(windowStart + patternLen);
      windowHash =
        ((windowHash - outgoingCharCode * highPow) * HASH_BASE + incomingCharCode) % HASH_PRIME;
      if (windowHash < 0) windowHash += HASH_PRIME;

      tracker.shiftPattern(windowStart + 1, 0, {
        windowStart: windowStart + 1,
        windowHash,
        outgoingChar: text[windowStart],
        incomingChar: text[windowStart + patternLen],
      });
    }
  }

  tracker.complete({ result: -1 });
  return tracker.getSteps();
}
