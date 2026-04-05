// Min Remove to Make Valid — use a stack of indices to track unmatched '(' and a set for unmatched ')'
function minRemoveToMakeValid(inputString: string): string {
  const unmatchedOpenIndices: number[] = []; // @step:initialize
  const unmatchedCloseIndices: Set<number> = new Set(); // @step:initialize
  for (let charIdx = 0; charIdx < inputString.length; charIdx++) {
    const char = inputString[charIdx]!; // @step:visit
    if (char === "(") {
      unmatchedOpenIndices.push(charIdx); // @step:push
    } else if (char === ")") {
      if (unmatchedOpenIndices.length > 0) {
        unmatchedOpenIndices.pop(); // @step:pop
      } else {
        unmatchedCloseIndices.add(charIdx); // @step:mismatch
      }
    }
  }
  // Remaining indices in the stack are unmatched opening brackets
  const unmatchedIndices: Set<number> = new Set([
    ...unmatchedOpenIndices,
    ...unmatchedCloseIndices,
  ]); // @step:mismatch
  let result = ""; // @step:complete
  for (let charIdx = 0; charIdx < inputString.length; charIdx++) {
    if (!unmatchedIndices.has(charIdx)) {
      result += inputString[charIdx]; // @step:complete
    }
  }
  return result; // @step:complete
}
