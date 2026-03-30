// Sort Characters by Frequency — sort a string by character frequency using a frequency map + bucket sort
function sortCharactersByFrequency(text: string): string {
  const freqMap = new Map<string, number>(); // @step:initialize
  for (let charIndex = 0; charIndex < text.length; charIndex++) {
    const currentChar = text[charIndex]!;
    freqMap.set(currentChar, (freqMap.get(currentChar) ?? 0) + 1); // @step:increment-count
  }
  // Bucket sort: index = frequency, value = list of chars with that frequency
  const buckets: string[][] = Array.from({ length: text.length + 1 }, () => []);
  for (const [char, freq] of freqMap.entries()) {
    buckets[freq]!.push(char); // @step:key-found
  }
  let result = "";
  for (let bucketIdx = buckets.length - 1; bucketIdx >= 0; bucketIdx--) {
    for (const char of buckets[bucketIdx]!) {
      result += char.repeat(bucketIdx); // @step:key-found
    }
  }
  return result; // @step:complete
}
