// Cuckoo Filter — probabilistic membership data structure using fingerprint-based cuckoo hashing.
// Elements are stored as fingerprints in a bucket array. Each element maps to 2 candidate buckets.
// If both buckets are full, an existing element is evicted and re-inserted at its alternate bucket.
// Time: O(1) amortized per insert/query, Space: O(n)

#include <iostream>
#include <vector>
#include <cstdlib>
#include <climits>

unsigned char computeFingerprint(int value) {
    return (unsigned char)(((unsigned int)value * 2654435761U) & 0xff);
}

int primaryBucket(int value, int bucketCount) {
    return std::abs(value) % bucketCount;
}

int alternateBucket(int bucketIdx, unsigned char fp, int bucketCount) {
    int result = bucketIdx ^ ((int)fp * 0x5bd1e995);
    return std::abs(result) % bucketCount;
}

struct QueryResult {
    int value;
    bool found;
};

std::vector<QueryResult> cuckooFilter(
    std::vector<int> elements,
    std::vector<int> queries,
    int bucketCount
) {
    std::vector<int> buckets(bucketCount, -1); // @step:initialize
    const int maxEvictions = 500;

    // Insert phase
    for (int element : elements) {
        unsigned char fp = computeFingerprint(element); // @step:hash-element
        int primary = primaryBucket(element, bucketCount);
        int alternate = alternateBucket(primary, fp, bucketCount);

        if (buckets[primary] == -1) {
            buckets[primary] = fp; // @step:insert-bucket
        } else if (buckets[alternate] == -1) {
            buckets[alternate] = fp; // @step:insert-bucket
        } else {
            // Evict from primary and re-insert the displaced fingerprint
            int currentBucket = primary;
            unsigned char displacedFp = fp;

            for (int evictionCount = 0; evictionCount < maxEvictions; evictionCount++) {
                unsigned char evicted = (buckets[currentBucket] == -1) ? 0 : (unsigned char)buckets[currentBucket];
                buckets[currentBucket] = displacedFp; // @step:evict-element
                displacedFp = evicted;
                currentBucket = alternateBucket(currentBucket, displacedFp, bucketCount);

                if (buckets[currentBucket] == -1) {
                    buckets[currentBucket] = displacedFp; // @step:insert-bucket
                    break;
                }
            }
        }
    }

    // Query phase
    std::vector<QueryResult> results;

    for (int query : queries) {
        unsigned char fp = computeFingerprint(query); // @step:hash-element
        int primary = primaryBucket(query, bucketCount);
        int alternate = alternateBucket(primary, fp, bucketCount);

        bool found = (buckets[primary] == fp) || (buckets[alternate] == fp);

        if (found) {
            (void)query; // @step:member-found
        } else {
            (void)query; // @step:member-not-found
        }

        results.push_back({query, found});
    }

    return results; // @step:complete
}

int main() {
    std::vector<int> elements = {1, 2, 3, 4, 5};
    std::vector<int> queries = {3, 6};
    auto results = cuckooFilter(elements, queries, 16);
    for (auto& result : results) {
        std::cout << "value=" << result.value << " found=" << result.found << "\n";
    }
    return 0;
}
