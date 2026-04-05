// Longest Valid Parentheses — find the length of the longest well-formed parentheses substring
function longestValidParentheses(inputString: string): number {
  const indexStack: number[] = [-1]; // @step:initialize
  let maxLength = 0; // @step:initialize
  for (let charIdx = 0; charIdx < inputString.length; charIdx++) {
    const char = inputString[charIdx]!; // @step:visit
    if (char === "(") {
      indexStack.push(charIdx); // @step:push
    } else {
      // Pop the top; if stack becomes empty, push current index as new base
      indexStack.pop(); // @step:pop
      if (indexStack.length === 0) {
        indexStack.push(charIdx); // @step:push
      } else {
        // Length of current valid substring = current index minus new stack top
        const stackTop = indexStack[indexStack.length - 1]!; // @step:compare
        const currentLength = charIdx - stackTop; // @step:compare
        if (currentLength > maxLength) {
          maxLength = currentLength; // @step:compare
        }
      }
    }
  }
  return maxLength; // @step:complete
}
