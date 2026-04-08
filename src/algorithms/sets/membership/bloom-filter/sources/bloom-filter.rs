// Bloom Filter — Probabilistic Membership Data Structure
// Uses k hash functions to map elements into a bit array of size m.
// Insert: set k bit positions to 1. Query: check if all k positions are 1.
// False positives possible; false negatives impossible.
// Time: O(k) per operation — Space: O(m) for the bit array

fn compute_hash_positions(value: i32, hash_count: usize, size: usize) -> Vec<usize> {
    let mut positions = Vec::new();
    for hash_idx in 0..hash_count {
        let hash = ((value * (hash_idx as i32 + 1) * 31 + hash_idx as i32 * 17).abs() as usize) % size;
        positions.push(hash);
    }
    positions
}

struct QueryResult {
    value: i32,
    found: bool,
}

fn bloom_filter(
    elements: &[i32],
    queries: &[i32],
    size: usize,
    hash_count: usize,
) -> Vec<QueryResult> {
    let mut bit_array = vec![0u8; size]; // @step:initialize

    // Insert phase: hash each element and set its bit positions
    for &element in elements {
        let positions = compute_hash_positions(element, hash_count, size); // @step:hash-element
        for position in positions {
            bit_array[position] = 1; // @step:set-bit
        }
    }

    let mut results = Vec::new();

    // Query phase: check if all bit positions for a query value are set
    for &query in queries {
        let positions = compute_hash_positions(query, hash_count, size); // @step:check-bit
        let all_bits_set = positions.iter().all(|&pos| bit_array[pos] == 1);

        if all_bits_set {
            results.push(QueryResult { value: query, found: true }); // @step:member-found
        } else {
            results.push(QueryResult { value: query, found: false }); // @step:member-not-found
        }
    }

    results // @step:complete
}

fn main() {
    let elements = vec![1, 2, 3, 4, 5];
    let queries = vec![3, 6];
    let results = bloom_filter(&elements, &queries, 20, 3);
    for result in &results {
        println!("value={} found={}", result.value, result.found);
    }
}
