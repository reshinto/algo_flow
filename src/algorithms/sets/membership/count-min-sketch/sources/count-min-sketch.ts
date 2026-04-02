// Count-Min Sketch — probabilistic frequency estimation using a d×w counter matrix.
// Supports sub-linear space frequency estimation with one-sided error (never undercounts).
// Time: O(d) per insert/query — Space: O(d × w)

function computeSketchHash(value: number, hashIdx: number, width: number): number {
  return Math.abs((value * (hashIdx * 1327 + 31) + hashIdx * 7919) % width); // @step:hash-element
}

function countMinSketch(
  elements: number[],
  queries: number[],
  width: number,
  depth: number,
): { results: { value: number; estimatedCount: number }[] } {
  // Initialize d×w counter matrix with all zeros
  const sketch: number[][] = Array.from({ length: depth }, () =>
    Array.from({ length: width }, () => 0),
  ); // @step:initialize

  // Insert phase: for each element, increment d counters
  for (const element of elements) {
    for (let hashIdx = 0; hashIdx < depth; hashIdx++) {
      const col = computeSketchHash(element, hashIdx, width);
      const sketchRow = sketch[hashIdx]!;
      sketchRow[col] = (sketchRow[col] ?? 0) + 1; // @step:increment-count
    }
  }

  // Query phase: estimate frequency by taking minimum across all d rows
  const results: { value: number; estimatedCount: number }[] = [];
  for (const query of queries) {
    let minCount = Infinity; // @step:check-membership
    for (let hashIdx = 0; hashIdx < depth; hashIdx++) {
      const col = computeSketchHash(query, hashIdx, width);
      const rowCount = sketch[hashIdx]![col] ?? 0;
      if (rowCount < minCount) {
        minCount = rowCount;
      }
    }
    const estimatedCount = minCount === Infinity ? 0 : minCount;
    if (estimatedCount > 0) {
      results.push({ value: query, estimatedCount }); // @step:member-found
    } else {
      void query; // @step:member-not-found
    }
  }

  return { results }; // @step:complete
}
