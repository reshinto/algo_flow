// Remove All Adjacent Duplicates — use a stack to repeatedly remove adjacent duplicate pairs
function removeAllAdjacentDuplicates(inputString: string): string {
  const stack: string[] = []; // @step:initialize
  for (let charIdx = 0; charIdx < inputString.length; charIdx++) {
    const char = inputString[charIdx]!; // @step:visit
    const stackTop = stack[stack.length - 1]; // @step:visit
    if (stack.length > 0 && stackTop === char) {
      stack.pop(); // @step:match
    } else {
      stack.push(char); // @step:push
    }
  }
  // Remaining stack characters form the result after all duplicate pairs removed
  return stack.join(""); // @step:complete
}
