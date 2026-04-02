/** Step generator for Cuckoo Filter — produces ExecutionStep[] using SetMembershipTracker. */

import type { ExecutionStep } from "@/types";
import { SetMembershipTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CUCKOO_FILTER_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CUCKOO_FILTER!);

const MAX_EVICTION_CHAIN = 500;

export interface CuckooFilterInput {
  elements: number[];
  queries: number[];
  bucketCount: number;
}

function computeFingerprint(value: number): number {
  return ((value * 2654435761) >>> 0) & 0xff;
}

function computePrimaryBucket(value: number, bucketCount: number): number {
  return Math.abs(value) % bucketCount;
}

function computeAlternateBucket(bucketIdx: number, fp: number, bucketCount: number): number {
  const result = bucketIdx ^ (fp * 0x5bd1e995);
  return Math.abs(result) % bucketCount;
}

export function generateCuckooFilterSteps(input: CuckooFilterInput): ExecutionStep[] {
  const { elements, queries, bucketCount } = input;

  const tracker = new SetMembershipTracker(bucketCount, bucketCount, 2, CUCKOO_FILTER_LINE_MAP);

  // Internal bucket state (null = empty slot)
  const buckets: (number | null)[] = new Array(bucketCount).fill(null);

  tracker.initialize({ elements, queries, bucketCount, buckets: [...buckets] });

  // Insert phase
  for (const element of elements) {
    const fp = computeFingerprint(element);
    const primaryIdx = computePrimaryBucket(element, bucketCount);
    const alternateIdx = computeAlternateBucket(primaryIdx, fp, bucketCount);

    tracker.hashElement(element, [primaryIdx, alternateIdx], {
      element,
      fingerprint: fp,
      primaryBucket: primaryIdx,
      alternateBucket: alternateIdx,
      buckets: [...buckets],
    });

    if (buckets[primaryIdx] === null) {
      buckets[primaryIdx] = fp;
      tracker.insertBucket(element, primaryIdx, {
        element,
        fingerprint: fp,
        targetBucket: primaryIdx,
        buckets: [...buckets],
      });
    } else if (buckets[alternateIdx] === null) {
      buckets[alternateIdx] = fp;
      tracker.insertBucket(element, alternateIdx, {
        element,
        fingerprint: fp,
        targetBucket: alternateIdx,
        buckets: [...buckets],
      });
    } else {
      // Eviction chain: displace from primary and re-insert displaced fingerprint
      let currentBucketIdx = primaryIdx;
      let displacedFp = fp;

      for (let evictionCount = 0; evictionCount < MAX_EVICTION_CHAIN; evictionCount++) {
        const evictedFp = buckets[currentBucketIdx] ?? 0;

        tracker.evictElement(displacedFp, currentBucketIdx, {
          element,
          displacedFingerprint: displacedFp,
          evictedFingerprint: evictedFp,
          fromBucket: currentBucketIdx,
          evictionCount,
          buckets: [...buckets],
        });

        buckets[currentBucketIdx] = displacedFp;
        displacedFp = evictedFp;

        const nextBucketIdx = computeAlternateBucket(currentBucketIdx, displacedFp, bucketCount);

        if (buckets[nextBucketIdx] === null) {
          buckets[nextBucketIdx] = displacedFp;
          tracker.insertBucket(displacedFp, nextBucketIdx, {
            element,
            fingerprint: displacedFp,
            targetBucket: nextBucketIdx,
            evictionChainLength: evictionCount + 1,
            buckets: [...buckets],
          });
          break;
        }

        currentBucketIdx = nextBucketIdx;
      }
    }
  }

  // Query phase
  for (const query of queries) {
    const fp = computeFingerprint(query);
    const primaryIdx = computePrimaryBucket(query, bucketCount);
    const alternateIdx = computeAlternateBucket(primaryIdx, fp, bucketCount);

    tracker.queryMembership(query, {
      query,
      fingerprint: fp,
      primaryBucket: primaryIdx,
      alternateBucket: alternateIdx,
      buckets: [...buckets],
    });

    const foundInPrimary = buckets[primaryIdx] === fp;
    const foundInAlternate = buckets[alternateIdx] === fp;
    const found = foundInPrimary || foundInAlternate;

    // A false positive occurs when the query was not in elements but fp collides
    const wasInserted = elements.includes(query);
    const isFalsePositive = found && !wasInserted;

    tracker.queryResult(query, found, isFalsePositive, {
      query,
      fingerprint: fp,
      primaryBucket: primaryIdx,
      alternateBucket: alternateIdx,
      foundInPrimary,
      foundInAlternate,
      found,
      isFalsePositive,
      buckets: [...buckets],
    });
  }

  tracker.complete({ elements, queries, bucketCount, buckets: [...buckets] });

  return tracker.getSteps();
}
