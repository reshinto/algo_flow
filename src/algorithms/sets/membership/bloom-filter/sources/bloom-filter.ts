// Bloom Filter — Probabilistic Membership Data Structure
// Uses k hash functions to map elements into a bit array of size m.
// Insert: set k bit positions to 1. Query: check if all k positions are 1.
// False positives possible; false negatives impossible.
// Time: O(k) per operation — Space: O(m) for the bit array

function computeHashPositions(value: number, hashCount: number, size: number): number[] {
  const positions: number[] = [];
  for (let hashIdx = 0; hashIdx < hashCount; hashIdx++) {
    const hash = Math.abs((value * (hashIdx + 1) * 31 + hashIdx * 17) % size);
    positions.push(hash);
  }
  return positions;
}

function bloomFilter(
  elements: number[],
  queries: number[],
  size: number,
  hashCount: number,
): { results: { value: number; found: boolean }[] } {
  const bitArray = new Array<number>(size).fill(0); // @step:initialize

  // Insert phase: hash each element and set its bit positions
  for (const element of elements) {
    const positions = computeHashPositions(element, hashCount, size); // @step:hash-element
    for (const position of positions) {
      bitArray[position] = 1; // @step:set-bit
    }
  }

  const results: { value: number; found: boolean }[] = [];

  // Query phase: check if all bit positions for a query value are set
  for (const query of queries) {
    const positions = computeHashPositions(query, hashCount, size); // @step:check-bit
    let allBitsSet = true;
    for (const position of positions) {
      if (bitArray[position] !== 1) {
        allBitsSet = false;
        break;
      }
    }

    if (allBitsSet) {
      results.push({ value: query, found: true }); // @step:member-found
    } else {
      results.push({ value: query, found: false }); // @step:member-not-found
    }
  }

  return { results }; // @step:complete
}
