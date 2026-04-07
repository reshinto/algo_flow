// Cuckoo Filter — probabilistic membership data structure using fingerprint-based cuckoo hashing.
// Elements are stored as fingerprints in a bucket array. Each element maps to 2 candidate buckets.
// If both buckets are full, an existing element is evicted and re-inserted at its alternate bucket.
// Time: O(1) amortized per insert/query, Space: O(n)

fn fingerprint(value: i32) -> u8 {
    ((value as u32).wrapping_mul(2654435761) & 0xff) as u8
}

fn primary_bucket(value: i32, bucket_count: usize) -> usize {
    (value.unsigned_abs() as usize) % bucket_count
}

fn alternate_bucket(bucket_idx: usize, fp: u8, bucket_count: usize) -> usize {
    let result = bucket_idx ^ (fp as usize).wrapping_mul(0x5bd1e995);
    result % bucket_count
}

struct QueryResult {
    value: i32,
    found: bool,
}

fn cuckoo_filter(elements: &[i32], queries: &[i32], bucket_count: usize) -> Vec<QueryResult> {
    let mut buckets: Vec<Option<u8>> = vec![None; bucket_count]; // @step:initialize
    let max_evictions = 500;

    // Insert phase
    for &element in elements {
        let fp = fingerprint(element); // @step:hash-element
        let primary = primary_bucket(element, bucket_count);
        let alternate = alternate_bucket(primary, fp, bucket_count);

        if buckets[primary].is_none() {
            buckets[primary] = Some(fp); // @step:insert-bucket
        } else if buckets[alternate].is_none() {
            buckets[alternate] = Some(fp); // @step:insert-bucket
        } else {
            // Evict from primary and re-insert the displaced fingerprint
            let mut current_bucket = primary;
            let mut displaced_fp = fp;

            for _eviction_count in 0..max_evictions {
                let evicted = buckets[current_bucket].unwrap_or(0);
                buckets[current_bucket] = Some(displaced_fp); // @step:evict-element
                displaced_fp = evicted;
                current_bucket = alternate_bucket(current_bucket, displaced_fp, bucket_count);

                if buckets[current_bucket].is_none() {
                    buckets[current_bucket] = Some(displaced_fp); // @step:insert-bucket
                    break;
                }
            }
        }
    }

    // Query phase
    let mut results = Vec::new();

    for &query in queries {
        let fp = fingerprint(query); // @step:hash-element
        let primary = primary_bucket(query, bucket_count);
        let alternate = alternate_bucket(primary, fp, bucket_count);

        let found = buckets[primary] == Some(fp) || buckets[alternate] == Some(fp);

        if found {
            // @step:member-found
        } else {
            // @step:member-not-found
        }

        results.push(QueryResult { value: query, found });
    }

    results // @step:complete
}

fn main() {
    let elements = vec![1, 2, 3, 4, 5];
    let queries = vec![3, 6];
    let results = cuckoo_filter(&elements, &queries, 16);
    for result in &results {
        println!("value={} found={}", result.value, result.found);
    }
}
