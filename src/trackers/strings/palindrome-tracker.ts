/**
 * Palindrome tracker — builds execution steps for palindrome algorithms.
 * Supports both two-pointer (is-palindrome check) and expand-around-center
 * (longest palindromic substring) approaches. Emits steps for pointer
 * movement, character comparison, center expansion, and palindrome marking.
 */
import type { StringChar, StringCharState, PalindromeVisualState } from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export class PalindromeTracker extends BaseTracker {
  private chars: StringChar[];
  private leftPointer: number;
  private rightPointer: number;
  private centerIndex: number | null;
  private expandRadius: number;
  private isPalindrome: boolean | null;
  private longestStart: number;
  private longestLength: number;

  constructor(text: string, lineMap: LineMap) {
    super(lineMap);
    this.chars = text
      .split("")
      .map((char) => ({ value: char, state: "default" as StringCharState }));
    this.leftPointer = 0;
    this.rightPointer = text.length - 1;
    this.centerIndex = null;
    this.expandRadius = 0;
    this.isPalindrome = null;
    this.longestStart = 0;
    this.longestLength = 0;
  }

  /** Return a deep copy of the current visual state. */
  private snapshot(): PalindromeVisualState {
    return {
      kind: "string-palindrome",
      chars: this.chars.map((char) => ({ ...char })),
      leftPointer: this.leftPointer,
      rightPointer: this.rightPointer,
      centerIndex: this.centerIndex,
      expandRadius: this.expandRadius,
      isPalindrome: this.isPalindrome,
      longestStart: this.longestStart,
      longestLength: this.longestLength,
    };
  }

  /** Set the state of a single character by index, guarding against out-of-bounds access. */
  private setCharState(charIdx: number, state: StringCharState): void {
    const char = this.chars[charIdx];
    if (char) char.state = state;
  }

  /** Reset all chars that currently have a given state back to "default". */
  private clearState(state: StringCharState): void {
    for (const char of this.chars) {
      if (char.state === state) char.state = "default";
    }
  }

  /** Emit an initialize step with all chars in their default state. */
  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize palindrome check",
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Move both pointers to the given positions and mark those chars as "current".
   * Clears any previous "current" highlights before applying.
   */
  setPointers(leftIdx: number, rightIdx: number, variables: Record<string, unknown>): void {
    this.clearState("current");
    this.leftPointer = leftIdx;
    this.rightPointer = rightIdx;
    this.setCharState(leftIdx, "current");
    // Avoid double-marking the same index when pointers converge on one char.
    if (rightIdx !== leftIdx) {
      this.setCharState(rightIdx, "current");
    }
    this.pushStep({
      type: "visit",
      description: `Set pointers: left=${leftIdx}, right=${rightIdx}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Highlight the two chars being compared and increment the comparisons metric.
   * Both chars are marked "current" to signal active comparison.
   */
  compareChars(leftIdx: number, rightIdx: number, variables: Record<string, unknown>): void {
    this.clearState("current");
    this.leftPointer = leftIdx;
    this.rightPointer = rightIdx;
    this.setCharState(leftIdx, "current");
    if (rightIdx !== leftIdx) {
      this.setCharState(rightIdx, "current");
    }
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "compare",
      description: `Compare chars[${leftIdx}]='${this.chars[leftIdx]?.value}' and chars[${rightIdx}]='${this.chars[rightIdx]?.value}'`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark both chars at the given positions as "matching" (characters are equal). */
  charsMatch(leftIdx: number, rightIdx: number, variables: Record<string, unknown>): void {
    this.setCharState(leftIdx, "matching");
    if (rightIdx !== leftIdx) {
      this.setCharState(rightIdx, "matching");
    }
    this.pushStep({
      type: "char-match",
      description: `Match: chars[${leftIdx}]='${this.chars[leftIdx]?.value}' == chars[${rightIdx}]='${this.chars[rightIdx]?.value}'`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Mark both chars as "mismatched" and set isPalindrome to false.
   * Used when the two-pointer check finds a non-matching pair.
   */
  charsMismatch(leftIdx: number, rightIdx: number, variables: Record<string, unknown>): void {
    this.setCharState(leftIdx, "mismatched");
    if (rightIdx !== leftIdx) {
      this.setCharState(rightIdx, "mismatched");
    }
    this.isPalindrome = false;
    this.pushStep({
      type: "char-mismatch",
      description: `Mismatch: chars[${leftIdx}]='${this.chars[leftIdx]?.value}' != chars[${rightIdx}]='${this.chars[rightIdx]?.value}'`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Set the current center and expansion radius for expand-around-center algorithms.
   * Marks the center character(s) as "current". For even-length palindromes the
   * center sits between two characters; both are marked when radius is 0.
   */
  expandCenter(centerIdx: number, radius: number, variables: Record<string, unknown>): void {
    this.clearState("current");
    this.centerIndex = centerIdx;
    this.expandRadius = radius;

    // Mark the center position(s) as current.
    this.setCharState(centerIdx, "current");

    // When expanding, also highlight the two chars at the current boundary.
    if (radius > 0) {
      const boundaryLeft = centerIdx - radius;
      const boundaryRight = centerIdx + radius;
      if (boundaryLeft >= 0) this.setCharState(boundaryLeft, "current");
      if (boundaryRight < this.chars.length) this.setCharState(boundaryRight, "current");
    }

    this.pushStep({
      type: "expand-center",
      description: `Expand from center=${centerIdx} with radius=${radius}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Mark a contiguous range of chars as "matched" and set isPalindrome to true.
   * Used when a palindrome is confirmed (start..start+length-1).
   */
  markPalindrome(start: number, length: number, variables: Record<string, unknown>): void {
    this.isPalindrome = true;
    for (let charIdx = start; charIdx < start + length; charIdx++) {
      this.setCharState(charIdx, "matched");
    }
    this.pushStep({
      type: "check-palindrome",
      description: `Palindrome confirmed: start=${start}, length=${length}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Update the tracked longest palindrome when a longer one is found.
   * Does not alter char states — call markPalindrome separately to highlight.
   */
  updateLongest(start: number, length: number, variables: Record<string, unknown>): void {
    this.longestStart = start;
    this.longestLength = length;
    this.pushStep({
      type: "check-palindrome",
      description: `New longest palindrome: start=${start}, length=${length}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Advance a non-alphanumeric pointer — marks the skipped char as "default"
   * and updates the appropriate pointer position.
   */
  skipNonAlphanumeric(
    pointerIdx: number,
    direction: "left" | "right",
    variables: Record<string, unknown>,
  ): void {
    this.setCharState(pointerIdx, "default");
    if (direction === "left") {
      this.leftPointer = pointerIdx;
    } else {
      this.rightPointer = pointerIdx;
    }
    this.pushStep({
      type: "skip-char",
      description: `Skip non-alphanumeric char at index ${pointerIdx} (${direction} pointer)`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Finalize the tracker state. Clears any residual "current" highlights and
   * marks the final palindrome range (longestStart..longestStart+longestLength-1)
   * as "matched" if one was found during the run.
   */
  complete(variables: Record<string, unknown>): void {
    this.clearState("current");

    if (this.longestLength > 0) {
      for (
        let charIdx = this.longestStart;
        charIdx < this.longestStart + this.longestLength;
        charIdx++
      ) {
        this.setCharState(charIdx, "matched");
      }
    }

    this.pushStep({
      type: "complete",
      description:
        this.isPalindrome === false
          ? "String is not a palindrome"
          : this.longestLength > 0
            ? `Longest palindrome: start=${this.longestStart}, length=${this.longestLength}`
            : "Palindrome check complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
