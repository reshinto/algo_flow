// Character Frequency Sort
// Sorts a string by character frequency (descending) using bucket sort.
// Time: O(n) where n = length of text (bucket sort avoids O(n log n) comparison sort)
// Space: O(n) — frequency map and output string both scale with input size

export function characterFrequencySort(text: string): string {
  if (text.length === 0) return ""; // @step:initialize

  const frequencyMap = new Map<string, number>(); // @step:initialize

  for (const char of text) {
    // @step:update-frequency
    frequencyMap.set(char, (frequencyMap.get(char) ?? 0) + 1); // @step:update-frequency
  }

  // Bucket sort: index = frequency, value = list of chars with that frequency
  const maxFrequency = text.length; // @step:sort-by-frequency
  const buckets: string[][] = Array.from({ length: maxFrequency + 1 }, () => []); // @step:sort-by-frequency

  for (const [char, freq] of frequencyMap) {
    // @step:sort-by-frequency
    buckets[freq]!.push(char); // @step:sort-by-frequency
  }

  let result = ""; // @step:build-output
  for (let freqIdx = maxFrequency; freqIdx >= 1; freqIdx--) {
    // @step:build-output
    for (const char of buckets[freqIdx]!) {
      // @step:add-to-result
      result += char.repeat(freqIdx); // @step:add-to-result
    }
  }

  return result; // @step:complete
}
