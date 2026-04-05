// Backspace String Compare — use a stack to process each string, treating '#' as backspace
function processWithBackspace(inputStr: string): string[] {
  const resultStack: string[] = []; // @step:initialize
  for (let charIdx = 0; charIdx < inputStr.length; charIdx++) {
    const char = inputStr[charIdx]!; // @step:visit
    if (char === "#") {
      resultStack.pop(); // @step:pop
    } else {
      resultStack.push(char); // @step:push
    }
  }
  return resultStack; // @step:compare
}

function backspaceStringCompare(firstString: string, secondString: string): boolean {
  const processedFirst = processWithBackspace(firstString); // @step:initialize
  const processedSecond = processWithBackspace(secondString); // @step:initialize
  if (processedFirst.length !== processedSecond.length) {
    return false; // @step:compare
  }
  for (let charIdx = 0; charIdx < processedFirst.length; charIdx++) {
    if (processedFirst[charIdx] !== processedSecond[charIdx]) {
      return false; // @step:compare
    }
  }
  return true; // @step:complete
}
