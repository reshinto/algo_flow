// Word Break memoization — determine if text can be segmented into dictionary words top-down

function wordBreakMemoization(
  text: string,
  dictionary: string[],
  memo: Map<number, boolean> = new Map(),
): boolean {
  // @step:initialize
  const textLength = text.length; // @step:initialize
  if (textLength === 0) return true; // @step:initialize

  function canBreak(startIndex: number): boolean {
    if (startIndex === textLength) return true; // @step:fill-table
    if (memo.has(startIndex)) return memo.get(startIndex)!; // @step:read-cache
    // @step:push-call
    for (const word of dictionary) {
      // @step:compute-cell
      const endIndex = startIndex + word.length; // @step:compute-cell
      if (endIndex <= textLength && text.slice(startIndex, endIndex) === word) {
        // @step:compute-cell
        if (canBreak(endIndex)) {
          // @step:compute-cell
          memo.set(startIndex, true); // @step:compute-cell
          return true; // @step:pop-call
        }
      }
    }
    memo.set(startIndex, false); // @step:compute-cell
    return false; // @step:pop-call
  }

  return canBreak(0); // @step:complete
}
