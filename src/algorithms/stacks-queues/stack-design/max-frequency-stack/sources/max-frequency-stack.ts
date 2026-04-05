// Max Frequency Stack — pop the most frequent element using a frequency map and stack-of-stacks
function maxFrequencyStack(values: number[]): number[] {
  const freqMap: Record<number, number> = {}; // @step:initialize
  const freqStacks: Record<number, number[]> = {}; // @step:initialize
  let maxFrequency = 0; // @step:initialize
  const popResults: number[] = []; // @step:initialize

  // Push phase: update frequency map and push each value onto its frequency-level stack
  for (let elementIdx = 0; elementIdx < values.length; elementIdx++) {
    const currentValue = values[elementIdx]!; // @step:visit
    const currentFreq = (freqMap[currentValue] ?? 0) + 1; // @step:compare
    freqMap[currentValue] = currentFreq; // @step:compare
    if (currentFreq > maxFrequency) {
      maxFrequency = currentFreq; // @step:compare
    }
    if (!freqStacks[currentFreq]) {
      freqStacks[currentFreq] = []; // @step:push
    }
    freqStacks[currentFreq]!.push(currentValue); // @step:push
  }

  // Pop phase: always pop from the highest-frequency stack
  while (maxFrequency > 0) {
    const topStack = freqStacks[maxFrequency]!; // @step:pop
    const popped = topStack.pop()!; // @step:pop
    freqMap[popped]--; // @step:pop
    if (topStack.length === 0) {
      maxFrequency--; // @step:pop
    }
    popResults.push(popped); // @step:pop
  }

  return popResults; // @step:complete
}
