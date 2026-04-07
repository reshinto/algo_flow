// Count-Min Sketch — probabilistic frequency estimation using a d×w counter matrix.
// Supports sub-linear space frequency estimation with one-sided error (never undercounts).
// Time: O(d) per insert/query — Space: O(d × w)

fn compute_sketch_hash(value: i32, hash_idx: usize, width: usize) -> usize {
    let result = (value * (hash_idx as i32 * 1327 + 31) + hash_idx as i32 * 7919).abs();
    (result as usize) % width // @step:hash-element
}

struct EstimatedResult {
    value: i32,
    estimated_count: usize,
}

fn count_min_sketch(
    elements: &[i32],
    queries: &[i32],
    width: usize,
    depth: usize,
) -> Vec<EstimatedResult> {
    // Initialize d×w counter matrix with all zeros
    let mut sketch: Vec<Vec<usize>> = vec![vec![0; width]; depth]; // @step:initialize

    // Insert phase: for each element, increment d counters
    for &element in elements {
        for hash_idx in 0..depth {
            let col = compute_sketch_hash(element, hash_idx, width);
            sketch[hash_idx][col] += 1; // @step:increment-count
        }
    }

    // Query phase: estimate frequency by taking minimum across all d rows
    let mut results = Vec::new();
    for &query in queries {
        let mut min_count = usize::MAX; // @step:check-membership
        for hash_idx in 0..depth {
            let col = compute_sketch_hash(query, hash_idx, width);
            if sketch[hash_idx][col] < min_count {
                min_count = sketch[hash_idx][col];
            }
        }
        let estimated_count = if min_count == usize::MAX { 0 } else { min_count };
        if estimated_count > 0 {
            results.push(EstimatedResult { value: query, estimated_count }); // @step:member-found
        } else {
            // @step:member-not-found
        }
    }

    results // @step:complete
}

fn main() {
    let elements = vec![1, 2, 1, 3, 2, 1];
    let queries = vec![1, 2, 3, 4];
    let results = count_min_sketch(&elements, &queries, 10, 3);
    for result in &results {
        println!("value={} count={}", result.value, result.estimated_count);
    }
}
