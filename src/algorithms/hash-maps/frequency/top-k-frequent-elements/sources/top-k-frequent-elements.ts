// Top K Frequent Elements — find the k most frequent elements using frequency map + bucket sort
function topKFrequentElements(numbers: number[], topK: number): number[] {
  const freqMap = new Map<number, number>(); // @step:initialize
  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const current = numbers[elementIndex]!;
    freqMap.set(current, (freqMap.get(current) ?? 0) + 1); // @step:increment-count
  }
  // Bucket sort: index = frequency, value = list of elements with that frequency
  const buckets: number[][] = Array.from({ length: numbers.length + 1 }, () => []);
  for (const [num, freq] of freqMap.entries()) {
    buckets[freq]!.push(num); // @step:key-found
  }
  const result: number[] = [];
  for (let bucketIdx = buckets.length - 1; bucketIdx >= 0 && result.length < topK; bucketIdx--) {
    for (const num of buckets[bucketIdx]!) {
      result.push(num); // @step:key-found
      if (result.length === topK) break;
    }
  }
  return result; // @step:complete
}
