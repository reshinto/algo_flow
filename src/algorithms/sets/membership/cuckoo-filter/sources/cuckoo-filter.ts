// Cuckoo Filter — probabilistic membership data structure using fingerprint-based cuckoo hashing.
// Elements are stored as fingerprints in a bucket array. Each element maps to 2 candidate buckets.
// If both buckets are full, an existing element is evicted and re-inserted at its alternate bucket.
// Time: O(1) amortized per insert/query, Space: O(n)

function fingerprint(value: number): number {
  return ((value * 2654435761) >>> 0) & 0xff;
}

function primaryBucket(value: number, bucketCount: number): number {
  return Math.abs(value) % bucketCount;
}

function alternateBucket(bucketIdx: number, fp: number, bucketCount: number): number {
  const result = bucketIdx ^ (fp * 0x5bd1e995);
  return Math.abs(result) % bucketCount;
}

function cuckooFilter(
  elements: number[],
  queries: number[],
  bucketCount: number,
): { results: { value: number; found: boolean }[] } {
  const buckets: (number | null)[] = new Array(bucketCount).fill(null); // @step:initialize
  const maxEvictions = 500;

  // Insert phase
  for (const element of elements) {
    const fp = fingerprint(element); // @step:hash-element
    const primary = primaryBucket(element, bucketCount);
    const alternate = alternateBucket(primary, fp, bucketCount);

    if (buckets[primary] === null) {
      buckets[primary] = fp; // @step:insert-bucket
    } else if (buckets[alternate] === null) {
      buckets[alternate] = fp; // @step:insert-bucket
    } else {
      // Evict from primary and re-insert the displaced fingerprint
      let currentBucket = primary;
      let displacedFp = fp;

      for (let evictionCount = 0; evictionCount < maxEvictions; evictionCount++) {
        const evicted = buckets[currentBucket] ?? 0;
        buckets[currentBucket] = displacedFp; // @step:evict-element
        displacedFp = evicted;
        currentBucket = alternateBucket(currentBucket, displacedFp, bucketCount);

        if (buckets[currentBucket] === null) {
          buckets[currentBucket] = displacedFp; // @step:insert-bucket
          break;
        }
      }
    }
  }

  // Query phase
  const results: { value: number; found: boolean }[] = [];

  for (const query of queries) {
    const fp = fingerprint(query); // @step:hash-element
    const primary = primaryBucket(query, bucketCount);
    const alternate = alternateBucket(primary, fp, bucketCount);

    const found = buckets[primary] === fp || buckets[alternate] === fp;

    if (found) {
      void query; // @step:member-found
    } else {
      void query; // @step:member-not-found
    }

    results.push({ value: query, found });
  }

  return { results }; // @step:complete
}
