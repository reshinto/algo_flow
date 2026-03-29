// Valid Parentheses — use a stack to verify every opening bracket has a matching closing bracket
function validParentheses(inputString: string): boolean {
  const stack: string[] = []; // @step:initialize
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" }; // @step:initialize
  for (let charIdx = 0; charIdx < inputString.length; charIdx++) {
    const char = inputString[charIdx]!; // @step:push,pop
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char); // @step:push
    } else {
      // Closing bracket — check that stack top matches the expected opening bracket
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[char]) {
        // @step:mismatch
        return false; // @step:mismatch
      }
      stack.pop(); // @step:pop
    }
  }
  // Valid only if every opened bracket was closed
  return stack.length === 0; // @step:complete
}
