// Boyer-Moore Voting Algorithm — O(n) majority element via candidate cancellation
function boyerMooreVoting(inputArray: number[]): { majorityElement: number; count: number } {
  if (inputArray.length === 0) {
    // @step:initialize
    return { majorityElement: -1, count: 0 }; // @step:initialize
  }

  let candidate = inputArray[0]!; // @step:initialize
  let voteCount = 0; // @step:initialize

  // Phase 1: Find candidate using cancellation
  for (let elementIndex = 0; elementIndex < inputArray.length; elementIndex++) {
    const currentElement = inputArray[elementIndex]!; // @step:visit

    if (voteCount === 0) {
      // @step:compare
      candidate = currentElement; // @step:compare
      voteCount = 1; // @step:compare
    } else if (currentElement === candidate) {
      voteCount++; // @step:visit
    } else {
      voteCount--; // @step:visit
    }
  }

  return { majorityElement: candidate, count: voteCount }; // @step:complete
}
