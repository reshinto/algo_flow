// Word Break tabulation — determine if a string can be segmented into dictionary words bottom-up
export function wordBreakTabulation(text: string, dictionary: string[]): boolean {
  // @step:initialize
  const textLength = text.length; // @step:initialize
  const dpTable = new Array<number>(textLength + 1).fill(0); // @step:initialize
  dpTable[0] = 1; // @step:fill-table
  for (let endIndex = 1; endIndex <= textLength; endIndex++) {
    // @step:read-cache
    for (const word of dictionary) {
      // @step:read-cache
      if (endIndex >= word.length) {
        // @step:read-cache
        const segment = text.substring(endIndex - word.length, endIndex); // @step:read-cache
        if (segment === word && dpTable[endIndex - word.length] === 1) {
          // @step:read-cache
          dpTable[endIndex] = 1; // @step:read-cache
        }
      }
      // @step:compute-cell
    }
  }
  return dpTable[textLength] === 1; // @step:complete
}
