// Remove K Digits — greedy monotonic stack to produce the smallest number after k removals
function removeKDigits(num: string, removalCount: number): string {
  const digitStack: string[] = []; // @step:initialize
  let removalsLeft = removalCount; // @step:initialize

  for (let digitIdx = 0; digitIdx < num.length; digitIdx++) {
    const currentDigit = num[digitIdx]!; // @step:visit
    // While we still have removals and the stack top is greater than the current digit, pop it
    while (
      removalsLeft > 0 &&
      digitStack.length > 0 &&
      digitStack[digitStack.length - 1]! > currentDigit
    ) {
      // @step:compare
      digitStack.pop(); // @step:pop
      removalsLeft--; // @step:maintain-monotonic
    }
    digitStack.push(currentDigit); // @step:push
  }

  // Remove remaining digits from the end if we still have removals left
  while (removalsLeft > 0) {
    digitStack.pop(); // @step:pop
    removalsLeft--; // @step:complete
  }

  // Strip leading zeros and return; default to "0" for an empty result
  const result = digitStack.join("").replace(/^0+/, "") || "0"; // @step:complete
  return result; // @step:complete
}
