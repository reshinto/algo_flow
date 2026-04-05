// Decode String — use a stack to decode encoded strings like "3[a2[c]]" → "accaccacc"
function decodeString(inputString: string): string {
  const countStack: number[] = []; // @step:initialize
  const stringStack: string[] = []; // @step:initialize
  let currentString = ""; // @step:initialize
  let currentCount = 0; // @step:initialize

  for (let charIdx = 0; charIdx < inputString.length; charIdx++) {
    const currentChar = inputString[charIdx]!; // @step:visit

    if (currentChar >= "0" && currentChar <= "9") {
      // Build up multi-digit multipliers
      currentCount = currentCount * 10 + parseInt(currentChar, 10); // @step:visit
    } else if (currentChar === "[") {
      // Push current context onto stacks and reset for nested segment
      countStack.push(currentCount); // @step:push
      stringStack.push(currentString); // @step:push
      currentCount = 0; // @step:push
      currentString = ""; // @step:push
    } else if (currentChar === "]") {
      // Pop context and expand the repeated segment
      const repeatCount = countStack.pop()!; // @step:pop
      const prevString = stringStack.pop()!; // @step:pop
      currentString = prevString + currentString.repeat(repeatCount); // @step:pop
    } else {
      // Regular character — append to current string accumulator
      currentString += currentChar; // @step:visit
    }
  }

  return currentString; // @step:complete
}
