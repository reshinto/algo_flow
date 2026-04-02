// Cuckoo Filter — probabilistic membership data structure using fingerprint-based cuckoo hashing.
// Elements are stored as fingerprints in a bucket array. Each element maps to 2 candidate buckets.
// If both buckets are full, an existing element is evicted and re-inserted at its alternate bucket.
// Time: O(1) amortized per insert/query, Space: O(n)

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CuckooFilter {

    private static int fingerprint(int value) {
        return (int) ((((long) value * 2654435761L) & 0xFFFFFFFFL)) & 0xFF;
    }

    private static int primaryBucket(int value, int bucketCount) {
        return Math.abs(value) % bucketCount;
    }

    private static int alternateBucket(int bucketIdx, int fp, int bucketCount) {
        int result = bucketIdx ^ (fp * 0x5bd1e995);
        return Math.abs(result) % bucketCount;
    }

    public static Map<String, List<Map<String, Object>>> cuckooFilter(
            int[] elements, int[] queries, int bucketCount) {
        Integer[] buckets = new Integer[bucketCount]; // @step:initialize
        int maxEvictions = 500;

        // Insert phase
        for (int element : elements) {
            int fp = fingerprint(element); // @step:hash-element
            int primary = primaryBucket(element, bucketCount);
            int alternate = alternateBucket(primary, fp, bucketCount);

            if (buckets[primary] == null) {
                buckets[primary] = fp; // @step:insert-bucket
            } else if (buckets[alternate] == null) {
                buckets[alternate] = fp; // @step:insert-bucket
            } else {
                // Evict from primary and re-insert the displaced fingerprint
                int currentBucket = primary;
                int displacedFp = fp;

                for (int evictionCount = 0; evictionCount < maxEvictions; evictionCount++) {
                    int evicted = buckets[currentBucket] != null ? buckets[currentBucket] : 0;
                    buckets[currentBucket] = displacedFp; // @step:evict-element
                    displacedFp = evicted;
                    currentBucket = alternateBucket(currentBucket, displacedFp, bucketCount);

                    if (buckets[currentBucket] == null) {
                        buckets[currentBucket] = displacedFp; // @step:insert-bucket
                        break;
                    }
                }
            }
        }

        // Query phase
        List<Map<String, Object>> results = new ArrayList<>();

        for (int query : queries) {
            int fp = fingerprint(query); // @step:hash-element
            int primary = primaryBucket(query, bucketCount);
            int alternate = alternateBucket(primary, fp, bucketCount);

            boolean found = (buckets[primary] != null && buckets[primary] == fp)
                    || (buckets[alternate] != null && buckets[alternate] == fp);

            if (found) {
                // query is a member of the filter // @step:member-found
            } else {
                // query is definitively not in the filter // @step:member-not-found
            }

            Map<String, Object> result = new HashMap<>();
            result.put("value", query);
            result.put("found", found);
            results.add(result);
        }

        Map<String, List<Map<String, Object>>> output = new HashMap<>();
        output.put("results", results); // @step:complete
        return output;
    }
}
