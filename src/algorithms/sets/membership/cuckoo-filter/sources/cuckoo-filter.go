// Cuckoo Filter — probabilistic membership data structure using fingerprint-based cuckoo hashing.
// Elements are stored as fingerprints in a bucket array. Each element maps to 2 candidate buckets.
// If both buckets are full, an existing element is evicted and re-inserted at its alternate bucket.
// Time: O(1) amortized per insert/query, Space: O(n)

package main

import "fmt"

func computeFingerprint(value int) byte {
	return byte((uint32(value) * 2654435761) & 0xff)
}

func primaryBucket(value int, bucketCount int) int {
	result := value
	if result < 0 {
		result = -result
	}
	return result % bucketCount
}

func alternateBucket(bucketIdx int, fp byte, bucketCount int) int {
	result := bucketIdx ^ (int(fp) * 0x5bd1e995)
	if result < 0 {
		result = -result
	}
	return result % bucketCount
}

type QueryResult struct {
	value int
	found bool
}

func cuckooFilter(elements []int, queries []int, bucketCount int) []QueryResult {
	buckets := make([]int, bucketCount)
	for bucketIdx := range buckets {
		buckets[bucketIdx] = -1
	}
	// @step:initialize
	maxEvictions := 500

	// Insert phase
	for _, element := range elements {
		fp := computeFingerprint(element) // @step:hash-element
		primary := primaryBucket(element, bucketCount)
		alternate := alternateBucket(primary, fp, bucketCount)

		if buckets[primary] == -1 {
			buckets[primary] = int(fp) // @step:insert-bucket
		} else if buckets[alternate] == -1 {
			buckets[alternate] = int(fp) // @step:insert-bucket
		} else {
			// Evict from primary and re-insert the displaced fingerprint
			currentBucket := primary
			displacedFp := fp

			for evictionCount := 0; evictionCount < maxEvictions; evictionCount++ {
				evicted := byte(0)
				if buckets[currentBucket] != -1 {
					evicted = byte(buckets[currentBucket])
				}
				buckets[currentBucket] = int(displacedFp) // @step:evict-element
				displacedFp = evicted
				currentBucket = alternateBucket(currentBucket, displacedFp, bucketCount)

				if buckets[currentBucket] == -1 {
					buckets[currentBucket] = int(displacedFp) // @step:insert-bucket
					break
				}
			}
		}
	}

	// Query phase
	results := make([]QueryResult, 0)

	for _, query := range queries {
		fp := computeFingerprint(query) // @step:hash-element
		primary := primaryBucket(query, bucketCount)
		alternate := alternateBucket(primary, fp, bucketCount)

		found := buckets[primary] == int(fp) || buckets[alternate] == int(fp)

		if found {
			_ = query // @step:member-found
		} else {
			_ = query // @step:member-not-found
		}

		results = append(results, QueryResult{query, found})
	}

	return results // @step:complete
}

func main() {
	elements := []int{1, 2, 3, 4, 5}
	queries := []int{3, 6}
	results := cuckooFilter(elements, queries, 16)
	for _, result := range results {
		fmt.Printf("value=%d found=%v\n", result.value, result.found)
	}
}
